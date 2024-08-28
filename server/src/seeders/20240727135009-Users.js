'use strict';
const bcrypt = require('bcrypt');
const { USER_ROLE, SALT_ROUNDS } = require('../constants');
const { MODERATOR, CREATOR, CUSTOMER } = USER_ROLE;

/** @type {import('sequelize-cli').Migration} */

const userCreate = (name, role, body) => {
  const email = `${name}@gmail.com`;
  const initValues = {
    firstName: name,
    lastName: name,
    displayName: name,
    email,
    password: bcrypt.hashSync(email, SALT_ROUNDS),
    role,
  };

  return { ...initValues, ...body };
};

const defaultUsersArr = [
  userCreate('buyer', CUSTOMER),
  userCreate('creative', CREATOR),
  userCreate('moderator', MODERATOR),
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', defaultUsersArr, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [...defaultUsersArr.map((u) => u.email)],
      },
    });
  },
};
