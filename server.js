// import db from './db'
const { pool, pquery } = require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
const { encrypt, decrypt, jwt, sendEmailConfirmation } = require('./auth')

// process request body json
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

app.put('/api/users', (req, res, next) => {
  (async() => {
    const { email, avatar, username } = req.body
    const client = await pool.connect()
    const query = pquery.bind(client)

    let added = false
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
          username: username
        }
        // jwt token
        const token = jwt(userData) 
        // send email nodemailer
        // const success = await sendEmailConfirmation(email, token)
        // console.log('email', success)
        // if(!success) {
          // console.log('email failed')
        // }
      }
    }
    client.release()
    res.json({added: added})
  })().catch(next)
})

app.listen(port, () => {
  console.log('server is listening on ', port)
})

const insertquery = async () => {
  // await a client
  const client = await pool.connect()
  const query = pquery.bind(client) // changing this context

  try {
    await query('BEGIN')
    await client.query('CREATE TABLE IF NOT EXISTS Users (id serial primary key, username varchar(60), password varchar(60))')
    await client.query('INSERT INTO Users (username, password) VALUES ($1, $2)',['wallbook_testing', 'root'])
    await query('COMMIT')
  } catch(e) {
    await query('ROLLBACK')
    throw e
  } finally {
    client.release()
    console.log('calling end')
    await pool.end()
    console.log('pool has drained')
  }
}

// insertquery().catch( e => console.error(e.stack))

// pool.connect((err, client, done) => {
//   if (err) throw err
//   client.query('SELECT * FROM users', (err, res) => {
//     done()
//
//     if(err) {
//       console.error(err.stack)
//     }else {
//       console.log(res)
//     }
//   })
//
// })
