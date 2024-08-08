'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ User, Message, Catalog }) {
      Conversation.belongsTo(User, {
        foreignKey: 'participant1',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.belongsTo(User, {
        foreignKey: 'participant2',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.belongsToMany(Catalog, {
        through: 'Conversations_to_Catalogs',
        foreignKey: 'conversationId',
        timestamps: false,
      });
    }
  }
  Conversation.init(
    {
      participant1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      participant2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      isBlackList1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isBlackList2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isFavorite1: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isFavorite2: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      timestamps: true,
    }
  );
  return Conversation;
};
