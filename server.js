// import db from './db'
require('dotenv').load()
const { pool, query } = require('./db')
const express = require('express')

const app = express()
const port = 8080

app.get('/', (request, response) => {
  response.send('hello from express!')
})

app.listen(port, () => {
  console.log('server is listening on ', port)
})

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
