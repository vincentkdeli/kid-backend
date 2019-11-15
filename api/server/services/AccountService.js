import database from '../src/models'

class AccountService {
  static async addAccount (newAccount) {
    try {
      return await database.Account.create(newAccount)
    } catch (err) {
      throw err
    }
  }
  
  static async getAccountByUsername (username) {
    try {
      return await database.Account.findOne({
        where: { username }
      })
    } catch (err) {
      throw err
    }
  }
}

export default AccountService
