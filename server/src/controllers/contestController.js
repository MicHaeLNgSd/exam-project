const db = require('../models');
const ServerError = require('../errors/ServerError');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { sendMail } = require('../utils/mailer');
const {
  updateContest,
  createOffer,
  updateOffer,
  updateContestStatus,
  updateOfferStatus,
} = require('./services/contest.service');
const { updateUser } = require('./services/user.service');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const {
      params: { contestId },
      tokenData: { role, userId },
    } = req;

    const whereByRole = (role) => {
      if (role === CONSTANTS.CREATOR) return { userId };
      if (role === CONSTANTS.CUSTOMER)
        return {
          status: {
            [db.Sequelize.Op.notIn]: [
              CONSTANTS.OFFER_STATUS_REVIEWING,
              CONSTANTS.OFFER_STATUS_DENIED,
            ],
          },
        };
      return {};
    };

    let contestInfo = await db.Contest.findOne({
      where: { id: contestId },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where: whereByRole(role),
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    contestInfo = contestInfo.get({ plain: true });

    contestInfo.Offers = contestInfo.Offers.map(({ Rating, ...rest }) => ({
      mark: Rating?.mark,
      ...rest,
    }));
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  const {
    params: { contestId },
    file,
    tokenData: { userId },
  } = req;

  if (file) {
    req.body.filename = file.filename;
    req.body.originalname = file.originalname;
  }

  try {
    const updatedContest = await updateContest(req.body, {
      id: contestId,
      userId,
    });
    res.send(updatedContest);
  } catch (err) {
    next(err);
  }
};

module.exports.getOffers = async (req, res, next) => {
  try {
    const { limit, offset, ...where } = req.query;

    const offers = await db.Offer.findAll({
      where,
      limit,
      offset: offset || 0,
      include: [
        {
          model: db.Contest,
          required: true,
          where: { status: CONSTANTS.CONTEST_STATUS_ACTIVE },
          attributes: [
            'id',
            'title',
            'contestType',

            'typeOfName',
            'brandStyle',
            'typeOfTagline',

            'fileName',
            'originalFileName',

            'industry',

            'styleName',
            'nameVenture',
          ],
        },
      ],
    });
    res.send({ offers, haveMore: offers.length !== 0 });
  } catch (err) {
    next(err);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await updateContestStatus(
    {
      status: db.sequelize.literal(`CASE
        WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
        WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
        ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
        END
    `),
    },
    { orderId },
    transaction
  );
  await updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );

  const newTransaction = {
    operationType: CONSTANTS.TRANSACTION_TYPE.INCOME,
    amount: finishedContest.prize,
    userId: creatorId,
  };
  await db.Transaction.create(newTransaction, { transaction });

  const updatedOffers = await updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
};

const getStatusByCommand = (command) => {
  switch (command) {
    case 'approve':
      return CONSTANTS.OFFER_STATUS_PENDING;
    case 'deny':
      return CONSTANTS.OFFER_STATUS_DENIED;
    default:
      return null;
  }
};

module.exports.setOfferReviewStatus = async (req, res, next) => {
  const { command, offerId } = req.body;
  try {
    const status = getStatusByCommand(command);
    if (!status) return null;

    const updatedOffer = await updateOffer({ status }, { id: offerId });

    const offer = await db.Offer.findOne({
      where: { id: offerId },
      include: [
        {
          model: db.User,
          required: true,
          attributes: ['id', 'displayName', 'email'],
        },
      ],
    });
    const { email, displayName } = offer.User;

    sendMail(email, status, displayName);

    res.send(updatedOffer);
  } catch (err) {
    next(err);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      query: { limit, offset, contestStatus: status },
    } = req;

    const contests = await db.Contest.findAll({
      where: { status, userId },
      limit,
      offset: offset || 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offer,
          required: false,
          attributes: ['id'],
          where: {
            status: {
              [db.Sequelize.Op.notIn]: [
                CONSTANTS.OFFER_STATUS_REVIEWING,
                CONSTANTS.OFFER_STATUS_DENIED,
              ],
            },
          },
        },
      ],
    });

    contests.forEach((c) => (c.dataValues.count = c.dataValues.Offers.length));
    res.send({ contests, haveMore: contests.length !== 0 });
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports.getContests = (req, res, next) => {
  const {
    tokenData: { userId },
    query: {
      limit,
      offset,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries,
    },
  } = req;

  const isOwnEntries = ownEntries === 'true';
  const data = [typeIndex, contestId, industry, awardSort];
  const { where, order } = UtilFunctions.createWhereForAllContests(...data);
  db.Contest.findAll({
    where,
    order,
    limit,
    offset: offset || 0,
    include: [
      {
        model: db.Offer,
        required: isOwnEntries,
        where: isOwnEntries ? { userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then((contests) => {
      contests.forEach(
        (c) => (c.dataValues.count = c.dataValues.Offers.length)
      );
      res.send({ contests, haveMore: contests.length !== 0 });
    })
    .catch((err) => {
      next(new ServerError());
    });
};
