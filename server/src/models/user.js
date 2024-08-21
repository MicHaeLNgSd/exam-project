'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');
const { CUSTOMER, CREATOR, MODERATOR } = CONSTANTS.USER_ROLE;

const hashPassword = async (user, options) => {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(
      user.password,
      CONSTANTS.SALT_ROUNDS
    );
    user.password = passwordHash;
  }
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Offer, Contest, Rating, Transaction }) {
      // define association here

      User.hasMany(Offer, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Contest, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Rating, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Transaction, { foreignKey: 'userId', targetKey: 'id' });
    }

    async passwordCompare(plainPassword) {
      return bcrypt.compare(plainPassword, this.getDataValue('password'));
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM(CUSTOMER, CREATOR, MODERATOR),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
