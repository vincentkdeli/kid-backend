const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
import database from '../api/server/src/models'

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      database.Account.findOne({
          where: {
            id: jwt_payload.id
          }
        })
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
    })
  );
};
