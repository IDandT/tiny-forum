const bcrypt = require('bcrypt')

// Cheks database results for login user. User exists,
// received password and hashed pasword comparison is ok..
async function checkUserLogin(data, password) {
  const recordCount = Object.keys(data).length

  // If not found...
  if (recordCount === 0) {
    return {
      code: 401,
      body: {
        message: 'El usuario no existe. Por favor registrese.',
      },
    }
  } else {
    const userInfo = data[0]

    // Check bcrypt stored password with password typed by user
    const match = await bcrypt.compare(password, userInfo.password)

    if (match) {
      return {
        code: 200,
        body: {
          message: 'Login correcto',
          id: userInfo.id,
          username: userInfo.username ?? '',
          admin: userInfo.admin,
          disabled: userInfo.disabled,
          expiration: userInfo.session_expires ?? 0,
          avatar: userInfo.avatar ?? '',
          avatarurl: process.env.AVATAR_URL,
        },
      }
    } else {
      return {
        code: 401,
        body: {
          message: 'La contraseña es incorrecta. Por favor inténtelo de nuevo.',
        },
      }
    }
  }
}

module.exports = { checkUserLogin }
