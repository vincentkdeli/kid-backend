import database from '../src/models'

class UserService {
  static async addUser (newUser) {
    try {
      return await database.User.create(newUser)
    } catch (err) {
      throw err
    }
  }
}

export default UserService
