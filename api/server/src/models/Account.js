'use strict'
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE
  }, {
    timestamps: false
  })
  Account.removeAttribute('id')
  // Account.associate = models => {
  //   Account.belongsTo(models.User)
  // }
  return Account
}
