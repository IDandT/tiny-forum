const mysql = require('mysql')
require('dotenv').config()

const config = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
}

const con = mysql.createConnection(config)

function mySqlQuery(sqlStatement, fields) {
  return new Promise((resolve, reject) => {
    con.query(sqlStatement, fields, (err, results) => {
      if (err) return reject(err)
      resolve(results)
      // console.log('Query executed:', sqlStatement)
    })
  })
}

module.exports = { mySqlQuery }
