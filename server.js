// import db from './db'
const { pool, pquery } = require('./db')
const redis = require('redis')
const bluebird = require('bluebird')
const passport = require('passport')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
const { encrypt, decrypt, jwtSign, jwtSignLogined, jwtVerify, jwtDecode, generateKey, sendEmailConfirmation } = require('./auth')

// create global async redis client
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisClient = redis.createClient()
redisClient.on('error', (err) => {
  console.error(`Error ${err}`) 
})

// initialize Passport middleware
app.use(passport.initialize())

// process request body json and form
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello from express!')
})

app.get('/api/users', (req, res, next) => {
  (async() => {
    const client = await pool.connect()
    const query = pquery.bind(client)
    const result = await query('SELECT * FROM Users')
    client.release()
    res.json(result.rows)
  })().catch(next)
})

// signup
app.post('/api/users', (req, res, next) => {
  (async() => {
    const { email, password } = req.body
    console.log(req.body)
    const client = await pool.connect()
    const query = pquery.bind(client)

    let added = false // check dup
    const exist = await query('SELECT * FROM Users WHERE email = $1', [email])
    if(exist.rowCount!==1 && req.body.hasOwnProperty('email')) {
      const hashedpassword = encrypt(password)
      try {
        await query('BEGIN')
        await query('INSERT INTO Users (email, password) VALUES ($1, $2)',[email, hashedpassword])
        await query('COMMIT')
        added = true
      } catch(e) {
        await query('ROLLBACK')
        throw e
      }
    }
    client.release()
    res.json({added: added})
  })().catch(next)
})

// avatar creation and email verification
app.put('/api/users', (req, res, next) => {
  (async() => {
    const { email, avatar, username } = req.body
    const client = await pool.connect()
    const query = pquery.bind(client)

    let added = false
    let emailSent = false
    const exist = await query('SELECT * FROM Users WHERE email = $1', [email])
    const usernameExist = await query('SELECT * FROM Users WHERE username = $1', [username])
    // email exist valid user and username does not exist
    if(exist.rowCount===1 && usernameExist.rowCount!==1) {
      const id = exist.rows[0].id
      try {
        await query('BEGIN')
        await query('UPDATE Users set avatar=$1, username=$2 WHERE id=$3', [avatar, username, id])
        await query('COMMIT')
        added = true
      } catch(e) {
        await query('ROLLBACK')
        throw e
      } finally {
        const userData = {
          id: id,
          email: email,
          username: username,
          password: exist.rows[0].password
        }
        // jwt token
        const key = generateKey()
        const setted = await redisClient.setex(`${username}:jwtkey`, 60*5, key) // k-v (username:token-token) expire in 5 minutes
        console.log('set', setted)
        const token = jwtSign(userData, key) 
        
        // send email nodemailer
        try {
          const success = await sendEmailConfirmation(email, token)
          emailSent = true
        } catch(e) {
          console.error(e)
        }
      }
    }
    client.release()
    res.json({
      added: added,
      emailSent: emailSent

    })
  })().catch(next)
})

// email verification alone
app.get('/api/email/:email', (req, res, next) => {
  (async() => {
    const { email } = req.params
    const client = await pool.connect()
    const query = pquery.bind(client)
    let emailSent = false
    // check existing account
    const result = await query('SELECT * FROM Users WHERE email = $1 and active= $2', [email, false])
    if(result.rowCount>0) {
      // account exist
      const { id, email, password, username } = result.rows[0]
      const key = generateKey()
      const token = await jwtSign({
        id,
        email,
        password,
        username
      }, key)
      // new key
      redisClient.setex(`${username}:jwtkey`, 60*5, key) // k-v (username:token-token) expire in 5 minutes

      // send email
      try {
          const success = await sendEmailConfirmation(email, token)
          emailSent = true
      } catch(e) {
        console.error(e)
      }
    }

    client.release()
    res.json({
      emailSent: emailSent
    })
  // })().catch(e => console.error(e.stack))
  })().catch(next)
})

app.put('/api/verify', (req, res, next) => {
  (async() => {
    const client = await pool.connect()
    const query = pquery.bind(client)
    const { token } = req.body
    let isVerified = false
    const { username } = jwtDecode(token)
    try {
      const key = await redisClient.getAsync(`${username}:jwtkey`)
      console.log(`key ${key}, token ${token}`)
      let decoded = jwtVerify(token, key)
      if(decoded) {
        isVerified = true
        // set database to true
        await query('UPDATE Users set active=$1 WHERE username=$2', [true, username])
        // remove the key
        redisClient.del(`${username}:jwtkey`)
      }
    } catch (e) {
      console.error('expired', e.stack)
    }

    console.log('verified?', isVerified)
    client.release()
    res.json({isVerified: isVerified})
  })().catch(next)
})
// app.post('/api/email/verify'), (req, res, next) => {
//     console.log('verify account first time hello')
//     let isVerified = false
//   // (async() => {
//   //   console.log('verify account first time', token, emailKey)

//   //   const isVerified = false
//   //   const { token } = req.body
    // try {
    //   const decoded = await jwtVerify(token, emailKey)
    //   if(decoded.email) {
    //     console.log('isVerified')
    //     isVerified = true
    //   }
    // }catch (e) {
    //   throw e
    // }
    // client.release()
//     res.json({
//       isVerified: isVerified
//     })
//   //   // console.log('the first one should expire and not working')
//   // })().catch(e => console.error(e.stack))
// }

app.post('/api/login', (req, res, next) => {
  (async() => {
    const { email, password } = req.body
    console.log(req.body)
    const client = await pool.connect()
    const query = pquery.bind(client)

    let logined = false // check dup
    const exist = await query('SELECT * FROM Users WHERE email = $1', [email])
    if(exist.rowCount!==1){
      res.status(403).json({message: 'No user found'})
    } 
    if(exist.rowCount===1 && password === decrypt(exist.rows[0].password)) {
      // account verified and logined
      if(!exist.rows[0].active) {
        res.status(401).json({message: 'You account is not verified'})
      }else {
        let payload = {
          id: exist.rows[0].id
        }
        let token = await jwtSignLogined(payload)

        res.json({
          logined: true, 
          user: {
            token: token,
            username: exist.rows[0].username
          }
        })

      }
    }else {
      res.status(403).json({message: 'Wrong password'})
    }
    client.release()
  })().catch(next)
})

app.listen(port, () => {
  console.log('server is listening on ', port)
})