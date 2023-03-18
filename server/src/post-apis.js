const sqlLayer = require('./utils/mysql-data-layer.js')

module.exports = function (app) {
  app.get('/getposts', async (req, res) => {
    try {
      const idTopic = req.query.idtopic

      const rows = await sqlLayer.mySqlQuery('CALL usp_PostGet(?);', idTopic)

      // Generate static path to avatar image
      rows[0].forEach((element) => {
        if (element.avatar) {
          element.avatar = process.env.AVATAR_URL + element.avatar
        } else {
          element.avatar = ''
        }
      })

      const data = JSON.stringify(rows[0])

      // rows.forEach((element) => {
      //   console.log(element.avatar)
      // })

      res.status(200).send({
        code: 200,
        body: {
          rows: data,
          message: 'Temas obtenidos correctamente',
        },
      })
    } catch (err) {
      res.status(500).send({
        code: 500,
        body: {
          message: String(err),
        },
      })
    }
  })

  app.put('/newpost', async (req, res) => {
    const idThread = req.body.id_thread
    const idUser = req.body.id_user
    const content = req.body.post

    const fields = [idThread, idUser, content]

    try {
      const data = await sqlLayer.mySqlQuery(
        'CALL usp_PostNew(?, ?, ?, @out_id); SELECT @out_id AS "out_id";',
        fields,
      )

      const rows = data[1]

      const insertedID = rows[0].out_id

      res.status(201).send({
        code: 201,
        body: {
          id: insertedID,
          message: 'Post publicado correctamente',
        },
      })
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
