const sqlLayer = require('./utils/mysql-data-layer.js')
const { uploadAvatarFile } = require('./utils/upload-utils.js')

module.exports = function (app) {
  app.post('/uploadavatar', async function (req, res, next) {
    try {
      // Upload file to 'avatar' folder
      const result = await uploadAvatarFile(req, res, next)

      // Update 'avatar' field in table 'users'
      const username = result.body.username
      const filename = result.body.filename
      const fields = [username, filename]

      await sqlLayer.mySqlQuery('CALL usp_UserUpdateAvatar(?, ?);', fields)

      res.status(result.code).send({ code: result.code, body: result.body })
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
