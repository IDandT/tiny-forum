const multer = require('multer')
require('dotenv').config()

// Configuration for avatar storage folder
// Prefix filename with timestamp
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_FOLDER)
  },
  filename: function (req, file, cb) {
    const finalName = Date.now() + '-' + file.originalname
    cb(null, finalName)
  },
})

const upload = multer({ storage: avatarStorage })

// Upload image to avatarStorage
function uploadAvatarFile(req, res, next) {
  return new Promise((resolve, reject) => {
    upload.single('avatar')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        reject({
          code: 500,
          body: {
            message: 'Hubo un error al subir el archivo',
          },
        })
      } else if (err) {
        reject({
          code: 500,
          body: {
            message: String(err),
          },
        })
      }
      resolve({
        code: 201,
        body: {
          filename: req.file.filename,
          username: req.body.username,
          message: 'Archivo subido correctamente',
        },
      })
    })
  }).catch((err) => {
    return {
      code: 500,
      body: {
        message: String(err),
      },
    }
  })
}

module.exports = { uploadAvatarFile }
