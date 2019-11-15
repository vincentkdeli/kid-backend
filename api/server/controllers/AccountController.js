import AccountService from '../services/AccountService'
import UserService from '../services/UserService'
import Response from '../utils/Response'

const responseUtil = new Response()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../../../config/keys')
const saltRounds = 10

class AccountController {
  static async register (req, res) {
    const { username, password, fullName, phoneNumber, email, dob, gender } = req.body
    if (!username || !password || !fullName || !phoneNumber || !email || !dob || !gender) {
      responseUtil.setError(400, 'BAD_REQUEST', 'MISSING_REQUIRED_FIELDS')
      return responseUtil.send(res)
    }
    try {
      const theAccount = await AccountService.getAccountByUsername(username)
      if (!!theAccount) {
        responseUtil.setError(400, 'BAD_REQUEST', 'ACCOUNT_MUST_BE_UNIQUE')
        return responseUtil.send(res)
      }
      bcrypt.hash(password, saltRounds, (err, hash) => {
        try {
          AccountService.addAccount({
            username,
            password: hash
          })
          UserService.addUser({
            accountUsername: username,
            fullName,
            phoneNumber,
            email,
            dob,
            gender
          })
          responseUtil.setSuccess(200, 'OK')
          return responseUtil.send(res)
        } catch (err) {
          responseUtil.setError(400, err.message)
          return responseUtil.send(res)
        }
      })
    } catch (err) {
      responseUtil.setError(404, err)
      return responseUtil.send(res)
    }
  }
  
  static async login (req, res) {
    if (!req.body.username || !req.body.password) {
      responseUtil.setError(400, 'BAD_REQUEST', 'MISSING_REQUIRED_FIELDS')
      return responseUtil.send(res)
    }
    const theAccount = await AccountService.getAccountByUsername(req.body.username)
    if (!theAccount) {
      responseUtil.setError(400, 'BAD_REQUEST', 'ACCOUNT_NOT_EXIST')
      return responseUtil.send(res)
    }
    await bcrypt.compare(req.body.password, theAccount.password, (err, response) => {
      if (response === false) {
        responseUtil.setError(400, 'BAD_REQUEST', 'INCORRECT_PASSWORD')
        return responseUtil.send(res)
      }
      if (response === true) {
        const { username, password, lastLogin } = theAccount
        const payload = { username, password }
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            const data = {
              username,
              lastLogin,
              token
            }
            responseUtil.setSuccess(200, 'OK', data)
            return responseUtil.send(res)
          }
        )
      }
    })
  }
}

export default AccountController
