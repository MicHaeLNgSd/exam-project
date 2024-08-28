module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      contestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contests',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  },
};
