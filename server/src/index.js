const express = require('express')
const cors = require('cors')
const sqlLayer = require('./mysql-data-layer.js')

const app = express()
const port = 3000

app.use(express.json({ limit: '1mb' }))
app.use(cors())

// Headers to avoid CORS errors. Use npm i cors instead.
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   )
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
//   next()
// })

app.get('/', (req, res) => {
  res.send('Welcome to tint-forum REST API')
})

app.get('/gettopics', async (req, res) => {
  try {
    const rows = await sqlLayer.mySqlQuery(`
      SELECT DISTINCT
        topics.id AS id,
        topics.title AS title,
        IFNULL(topics.description, "") AS description,
        IFNULL(COUNT(posts.id), 0) AS msgcount,
        DATE_FORMAT(MAX(posts.created), "%d/%m/%Y") AS last_date,
        DATE_FORMAT(MAX(posts.created), "%H:%i:%S") AS last_time,
        IFNULL(users.username, "") AS lastpostby
      FROM 
        topics
      LEFT JOIN 
        posts ON topics.id = posts.id_topic
      LEFT JOIN 
        users ON posts.id_user = users.id
      GROUP BY
        topics.id,
        topics.title,
        topics.description`)

    const data = JSON.parse(JSON.stringify(rows))

    // data.forEach((element) => {
    //   console.log(element)
    // })

    res.send(data)
  } catch (err) {
    console.error(String(err))
    res.statusCode = '500'
    res.send(String(err))
  }
})

app.get('/getposts', async (req, res) => {
  try {
    const idTopic = req.query.idtopic

    const rows = await sqlLayer.mySqlQuery(
      `
      SELECT
        posts.id AS id,
        posts.id_topic AS id_topic,
        IFNULL(posts.body, "") AS body,
        users.username AS username,
        DATE_FORMAT(posts.created, "%d/%m/%Y") AS create_date,
        DATE_FORMAT(posts.created, "%H:%i:%S") AS create_time
      FROM
        posts
      INNER JOIN
        users ON posts.id_user = users.id
      WHERE
        posts.id_topic = ?`,
      idTopic,
    )

    const data = JSON.parse(JSON.stringify(rows))

    res.send(data)
  } catch (err) {
    console.error(String(err))
    res.statusCode = '500'
    res.send(String(err))
  }
})

app.put('/newtopic', async (req, res) => {
  const title = req.body.title
  const description = req.body.description

  try {
    const fields = [title, description]

    const result = await sqlLayer.mySqlQuery(
      `INSERT INTO topics (title, description)
       VALUES (?, ?)`,
      fields,
    )
    const idResponse = { id: String(result.insertId) }
    res.send(idResponse)
  } catch (err) {
    console.error(String(err))
    res.statusCode = '500'
    res.send(String(err))
  }
})

app.put('/newpost', async (req, res) => {
  const idThread = req.body.id_thread
  const idUser = req.body.id_user
  const content = req.body.post

  const fields = [idThread, idUser, content]

  try {
    const result = await sqlLayer.mySqlQuery(
      `INSERT INTO posts (id_topic, id_user, body)
       VALUES (?, ?, ?)`,
      fields,
    )
    const idResponse = { id: String(result.insertId) }
    res.send(idResponse)
  } catch (err) {
    console.error(String(err))
    res.statusCode = '500'
    res.send(String(err))
  }
})

app.listen(port, () =>
  console.log(`Tiny-Forum REST API listening on port ${port}!`),
)
