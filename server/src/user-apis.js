const sqlLayer = require('./utils/mysql-data-layer.js')
const userUtils = require('./utils/user-utils.js')
const { formatDateTimestamp } = require('./utils/datetime.js')
const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = function (app) {
  // Registration API method. The params are username and password
  // The API hashes password with bcrypt and creates user in mysql
  app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
      const fields = [username, hashedPassword]

      await sqlLayer.mySqlQuery('CALL usp_UserCreate(?, ?);', fields)

      res.status(201).send({
        code: 201,
        body: {
          message: 'Registro correcto! Ya puede acceder!',
        },
      })
    } catch (err) {
      // Cheks if user already exists in mysql table and returns
      // Error code ER_DUP_ENTRY indicates a try to insert row that
      // breaks the UNIQUE username field integrity rule
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).send({
          code: 409,
          body: {
            message: 'Ya existe una cuenta de usuario con ese nombre.',
          },
        })
      } else {
        res.status(500).send({
          code: 500,
          body: {
            message: String(err),
          },
        })
      }
    }
  })

  // Login API method. The params are username and password
  // The API updates expiration date for user. if username
  app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
      // Get user info from mysql
      const rows = await sqlLayer.mySqlQuery('CALL usp_UserLogin(?);', username)

      const userDatabase = JSON.parse(JSON.stringify(rows[0]))

      // Check conditions for login
      const check = await userUtils.checkUserLogin(userDatabase, password)

      // If login is successfully, update session expiration timestamp
      if (check.code === 200) {
        const currentDate = new Date()
        const sessionExpires = new Date(
          currentDate.getTime() +
            1000 * 60 * (process.env.EXPIRATION_MINUTES || 1),
        )
        const datetime = formatDateTimestamp(sessionExpires)

        const fields = [username, datetime]

        await sqlLayer.mySqlQuery('CALL usp_UserUpdateSession(?, ?);', fields)

        // Add expiration timestamp to response body
        check.body.expiration = datetime
      }

      res.status(check.code).send({ code: check.code, body: check.body })
    } catch (err) {
      res.status(500).send({
        code: 500,
        body: {
          message: String(err),
        },
      })
    }
  })
}
