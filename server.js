// import db from './db'
const { pool, pquery } = require('./db')
const express = require('express')

const app = express()
const port = 8080

app.get('/', (request, response) => {
  response.send('hello from express!')
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

insertquery().catch( e => console.error(e.stack))

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
