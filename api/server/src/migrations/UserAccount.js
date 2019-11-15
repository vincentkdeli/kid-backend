'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'accountUsername',
      {
        type: Sequelize.STRING,
        references: {
          model: 'Accounts',
          key: 'username'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  },
  down: queryInterface => {
    return queryInterface.removeColumn(
      'Users',
      'accountUsername'
    )
  }
}
