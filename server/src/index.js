const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use('/avatars', express.static('avatars'))

// Custom error handler
function errorHandler(err, req, res, next) {
  if (err.type === 'entity.too.large') {
    res.status(500).send({
      code: 500,
      body: {
        message: 'Tamaño demasiado grande',
      },
    })
  } else {
    console.error(String(err))
    res.status(500).send({
      code: 500,
      body: {
        message: String(err),
      },
    })
  }
}

app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Welcome to tiny-forum REST API')
})

// All routes by category
require('./user-apis.js')(app)
require('./post-apis.js')(app)
require('./topic-apis.js')(app)
require('./profile-apis.js')(app)

app.listen(port, () =>
  console.log(`Tiny-Forum REST API listening on port ${port}!`),
)
