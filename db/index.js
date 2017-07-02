require('dotenv').load()

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL
console.log('right?', connectionString)
const pool = new Pool({connectionString: connectionString})

module.exports = {
  pool,
  pquery: (text, params) => pool.query(text, params)
}
