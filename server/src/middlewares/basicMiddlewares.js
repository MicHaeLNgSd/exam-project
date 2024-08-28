const db = require('../models');
const NotFound = require('../errors/UserNotFoundError');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.parseBody = (req, res, next) => {
  const contests = JSON.parse(req.body.contests);
  contests.forEach((c) => {
    if (c.haveFile) {
      const file = req.files.shift();
      c.fileName = file.filename;
      c.originalFileName = file.originalname;
    }
  });

  req.body.contests = contests;
  next();
};

module.exports.canGetContest = async (req, res, next) => {
  const {
    params: { contestId },
    tokenData: { role, userId },
  } = req;
  let result = null;
  try {
    if (role === CONSTANTS.USER_ROLE.CUSTOMER) {
      result = await db.Contest.findOne({
        where: { id: contestId, userId },
      });
    } else if (role === CONSTANTS.USER_ROLE.CREATOR) {
      result = await db.Contest.findOne({
        where: {
          id: contestId,
          status: {
            [db.Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS.ACTIVE,
              CONSTANTS.CONTEST_STATUS.FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.USER_ROLE.CUSTOMER) {
    next(new RightsError('this page only for creative'));
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.USER_ROLE.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.USER_ROLE.MODERATOR) {
    return next(new RightsError('this page only for moderator'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.USER_ROLE.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await db.Contest.findOne({
      where: {
        id: req.body.contestId,
      },
      attributes: ['status'],
    });
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS.ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS.ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = db.Contest.findOne({
      where: {
        userId: req.tokenData.userId,
        id: req.body.contestId,
        status: { [db.Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS.FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
