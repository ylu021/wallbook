const crypto = require('crypto')
const Jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { pool, pquery } = require('./db')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

require('dotenv').load()

const algorithm = 'aes-256-ctr'
const privateKey = process.env.PRIVATEKEY // onetime private key for password
const jwtOptions = {
  secretOrKey: privateKey,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

module.exports.passportAuth = () => {
  const strategy = new Strategy(jwtOptions, (payload, done) => {
    (async() => {
    //   // look for the user inside database
      const client = await pool.connect()
      const query = pquery.bind(client)
      const res = await query('SELECT * FROM Users WHERE id = $1',[payload.id])
      // console.log(res)
      if(res.rowCount>0) {
        return done(null, {
          details: res.rows[0]
        })
      }else {
        return done(null, false)
      }
      client.release()
    })().catch(done)
  })
  passport.use(strategy)
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false})
  }
}

module.exports.getPrivateKey = () => {
    return privateKey
}

// passport jwt
module.exports.getJwtOptions = () => {
    const passportJWT = require('passport-jwt')
    const { ExtractJwt } = passportJWT
    let jwtOptions = {}
    jwtOptions['jwtFromRequest'] = ExtractJwt.fromAuthHeader()
    jwtOptions['secretOrKey'] = privateKey
    return jwtOptions
}

module.exports.generateKey = ()=> {
    return crypto.randomBytes(32).toString('hex')
}

module.exports.encrypt = (password) => {
    const cipher = crypto.createCipher(algorithm, privateKey)
    var crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

module.exports.decrypt = (password) => {
    const decipher = crypto.createDecipher(algorithm, privateKey)
    var dec = decipher.update(password, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

module.exports.jwtSign = (userdata, key) => {
    return Jwt.sign(userdata, key, {
        expiresIn : '24h'
    })
}

module.exports.jwtSignLogined = (userdata) => {
    return Jwt.sign(userdata, privateKey)
}

module.exports.jwtVerify = (token, key) => {
    return Jwt.verify(token, key)
}

module.exports.jwtDecode = (token) => {
    return Jwt.decode(token)
}

module.exports.sendEmailConfirmation = (email, token) => {
    const {GOOGLECLIENTID, GOOGLECLIENTSECRET, GOOGLEREFRESHTOKEN, DCLIENT} = process.env
    console.log(GOOGLECLIENTID,GOOGLECLIENTSECRET, GOOGLEREFRESHTOKEN)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: GOOGLECLIENTID,
            clientSecret: GOOGLECLIENTSECRET,
        }
    })

    const link = DCLIENT+`/verify/${token}`

    const mailOptions = {
        auth: {
            user: 'yichen.luu@gmail.com',
            refreshToken: GOOGLEREFRESHTOKEN,
        },
        from: 'yichen.luu@gmail.com',
        to: email,
        subject: 'Wallbook Account Verification',
        html: `<p>Please confirm your email id by clicking on link in email <a href='${link}'>Verify</a><span></span></p>`
    }
    return transporter.sendMail(mailOptions)
}
