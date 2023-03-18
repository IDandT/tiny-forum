const sqlLayer = require('./utils/mysql-data-layer.js')

module.exports = function (app) {
  app.get('/gettopics', async (req, res) => {
    try {
      const rows = await sqlLayer.mySqlQuery('CALL usp_TopicGet();')

      const data = JSON.stringify(rows[0])

      // data.forEach((element) => {
      //   console.log(element)
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

  app.put('/newtopic', async (req, res) => {
    const title = req.body.title
    const description = req.body.description

    try {
      const fields = [title, description]

      const data = await sqlLayer.mySqlQuery(
        'CALL usp_TopicNew(?, ?, @out_id); SELECT @out_id AS "out_id";',
        fields,
      )

      const rows = data[1]

      const insertedID = rows[0].out_id

      res.status(201).send({
        code: 201,
        body: {
          id: insertedID,
          message: 'Tema publicado correctamente',
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
