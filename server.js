// import db from './db'
const { pool, pquery } = require('./db')
const redis = require('redis')
const bluebird = require('bluebird')

const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const express = require('express')
const bodyParser = require('body-parser')
const port = 8080
const { passportAuth, encrypt, decrypt, jwtSign, jwtSignLogined, jwtVerify, jwtDecode, generateKey, sendEmailConfirmation } = require('./auth')

// create global async redis client
bluebird.promisifyAll(redis.RedisClient.prototype)
const redisClient = redis.createClient()
redisClient.on('error', (err) => {
  console.error(`Error ${err}`)
})

const app = express()
app.use(passportAuth().initialize())
// process request body json and form
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello from express!')
})

app.get('/api/user', passportAuth().authenticate(), (req, res, next) => {
  let fetched = false
  if(req.get('Authorization')) {
    res.json({user: req.user.details })
  } else {
    res.status(401).json({user: {}})
  }
})

app.put('/api/like', passportAuth().authenticate(), (req, res, next) => {
  if(req.get('Authorization')) {
    (async() => {
      const { id } = req.user.details
      const { postid } = req.body

      const client = await pool.connect()
      const query = pquery.bind(client)
      // get current likes
      let liked = false
      let likes = await query('SELECT COUNT(post_id) AS count FROM Likes WHERE post_id = $1', [postid])
      likes = likes.rows[0].count
      const exist = await query('SELECT * FROM Likes WHERE user_id = $1 and post_id = $2', [id, postid])
      if(exist.rowCount>0) {
        // delete
        await query('DELETE FROM Likes WHERE user_id = $1 and post_id = $2', [id, postid])
        likes = likes - 1
        liked = false
      } else {
        await query('INSERT INTO Likes (user_id, post_id) VALUES($1, $2)', [id, postid])
        likes = +likes + 1
        liked = true
      }
      client.release()
      res.json({ liked: liked, likes: likes })
    })().catch(next)
  } else {
    res.status(401).json({})
  }
})

app.get('/api/posts', (req, res, next) => {
  (async() => {
    const client = await pool.connect()
    const query = pquery.bind(client)
    let posts = await query('SELECT * FROM Posts')
    posts = posts.rows
    const rows = await bluebird.all(posts.map(async (post) => {
      let user = await query('SELECT avatar, username From Users WHERE id = $1', [post.user_id])
      const { avatar, username } = user.rows[0]
      post['avatar'] = avatar
      post['username'] = username
      if(post.tag_id) {
        let tag = await query('SELECT name FROM Tags WHERE id = $1', [post.tag_id])
        post['tag'] = tag.rows[0].name
      }
      return post
    }))
    client.release()
    res.json({posts: rows})
  })().catch(next)
})

app.post('/api/posts', passportAuth().authenticate(), (req, res, next) => {
  if(req.get('Authorization')) {
    (async() => {
      let added = false
      console.log( req.body )
      const { content, tag } = req.body
      const { id } = req.user.details

      const client = await pool.connect()
      const query = pquery.bind(client)
      const exist = null
      try {
        // adding tag
        await query('BEGIN')
        if(tag) {
          console.log(tag)
          let inserted = await query('SELECT id FROM Tags WHERE name = $1', [tag])
          if(inserted.rowCount===0) {
            // inserted
            inserted = await query('INSERT INTO Tags (name) VALUES ($1) RETURNING id', [tag])
          }
          await query('INSERT INTO Posts (user_id, content, tag_id) VALUES ($1, $2, $3)', [
            id, content, inserted.rows[0].id
          ])

        } else {
          await query('INSERT INTO Posts (user_id, content) VALUES ($1, $2)', [
            id, content
          ])
        }
        await query('COMMIT')
        added = true
      } catch(e) {
        await query('ROLLBACK')
        throw e
      }
      client.release()
      console.log(added)
      res.json({added: added})
    })().catch(next)
  } else {
    res.status(401).json({added: added})
  }
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
