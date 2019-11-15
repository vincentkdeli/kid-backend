'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastLogin: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    })
  },
  down: queryInterface => {
    return queryInterface.dropTable('Accounts')
  }
}
