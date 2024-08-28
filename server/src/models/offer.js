'use strict';
const { Model } = require('sequelize');
const { OFFER_STATUS } = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Contest, Rating }) {
      // define association here
      Offer.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Offer.belongsTo(Contest, {
        foreignKey: 'contestId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Offer.hasOne(Rating, {
        foreignKey: 'offerId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: OFFER_STATUS.REVIEWING,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      timestamps: false,
    }
  );
  return Offer;
};
