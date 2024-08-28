'use strict';
const { Model } = require('sequelize');
const { TRANSACTION_TYPE } = require('../constants');
const { INCOME, EXPENSE } = TRANSACTION_TYPE;

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Transaction.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    }
  }
  Transaction.init(
    {
      operationType: {
        type: DataTypes.ENUM([INCOME, EXPENSE]),
        allowNull: false,
      },
      amount: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
