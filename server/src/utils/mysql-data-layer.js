const mysql = require('mysql')
require('dotenv').config()

// Mysql configuration options. The params are in .env
const config = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  multipleStatements: true,
}

const pool = mysql.createPool(config)

function mySqlQuery(sqlStatement, fields) {
  return new Promise((resolve, reject) => {
    pool.query(sqlStatement, fields, (err, results) => {
      if (err) return reject(err)
      resolve(results)
      // console.log('Query executed:', sqlStatement)
    })
  })
}

module.exports = { mySqlQuery }
