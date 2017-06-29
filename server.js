// import db from './db'
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

query('SELECT NOW()', (err, res) => {
  if(err){
    console.log('fail to connect db', err)
    pool.end()
  }else {
    console.log('successfully connected db', res)
    pool.end()
  }
})
