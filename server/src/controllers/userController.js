const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const db = require('../models');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await userQueries.findUser({ email: req.body.email });
    await userQueries.passwordCompare(req.body.password, foundUser.password);
    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};
module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass })
    );
    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        userId: newUser.id,
        role: newUser.role,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        displayName: newUser.displayName,
        balance: newUser.balance,
        email: newUser.email,
        rating: newUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME }
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await db.sequelize.transaction({
      isolationLevel:
        db.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await db.Rating.findAll({
      include: [
        {
          model: db.Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async ({ body, tokenData }, res, next) => {
  const { number, cvc, expiry, price, contests } = body;
  const { userId } = tokenData;

  const transaction = await db.sequelize.transaction();
  try {
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`
          CASE
            WHEN "cardNumber"='${number.replace(/ /g, '')}' 
              AND "cvc"='${cvc}' 
              AND "expiry"='${expiry}'
            THEN "balance" - ${price}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
              AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' 
              AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
            THEN "balance" + ${price}
          END
        `),
      },
      {
        cardNumber: {
          [db.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );

    const orderId = uuid();
    const createdAt = moment().format('YYYY-MM-DD HH:mm');

    contests.forEach((contest, index) => {
      const prize =
        index === contests.length - 1
          ? Math.ceil(price / contests.length)
          : Math.floor(price / contests.length);

      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId,
        priority: index + 1,
        orderId,
        createdAt,
        prize,
      });
    });
    await db.Contest.bulkCreate(contests, { transaction });

    //TODO EXPENSE to constans
    const newTransaction = {
      operationType: 'EXPENSE',
      amount: price,
      userId,
    };
    await db.Transaction.create(newTransaction, { transaction });

    await transaction.commit();
    res.send();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(
      req.body,
      req.tokenData.userId
    );
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async ({ body, tokenData }, res, next) => {
  //TODO rename: sum != payment.price != db.amount
  const { number, cvc, expiry, sum } = body;
  const { userId } = tokenData;

  const transaction = await db.sequelize.transaction();
  try {
    const updatedUser = await userQueries.updateUser(
      { balance: db.sequelize.literal('balance - ' + sum) },
      userId,
      transaction
    );
    await bankQueries.updateBankBalance(
      {
        balance: db.sequelize.literal(`
          CASE 
            WHEN "cardNumber"='${number.replace(/ /g, '')}' 
              AND "expiry"='${expiry}' 
              AND "cvc"='${cvc}'
            THEN "balance" + ${sum}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
              AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}' 
              AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
            THEN "balance" - ${sum}
          END
        `),
      },
      {
        cardNumber: {
          [db.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction
    );

    //TODO INCOME to constans
    const newTransaction = {
      operationType: 'INCOME',
      amount: sum,
      userId,
    };

    await db.Transaction.create(newTransaction, { transaction });

    await transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};
