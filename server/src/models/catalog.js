'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation }) {
      Catalog.belongsTo(User, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Catalog.belongsToMany(Conversation, {
        through: 'ConversationsToCatalogs',
        foreignKey: 'catalogId',
      });
    }
  }
  Catalog.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      catalogName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
      timestamps: false,
    }
  );
  return Catalog;
};
