const crypto = require('crypto')
const Jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').load()

const algorithm = 'aes-256-ctr'
const privateKey = crypto.randomBytes(32).toString('hex') // onetime private key for password

module.exports.generateKey = ()=> {
    return crypto.randomBytes(32).toString('hex')
} 

module.exports.decrypt = (password) => {
    const decipher = crypto.createDecipher(algorithm, privateKey)
    var dec = decipher.update(password, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
}

module.exports.encrypt = (password) => {
    const cipher = crypto.createCipher(algorithm, privateKey)
    var crypted = cipher.update(password, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

module.exports.jwtSign = (userdata, key) => {
    return Jwt.sign(userdata, key, {
        expiresIn : '24h' 
    })
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