// Does validations for input fields username and password
// Returns a error message, or undefined if pass all validations
export function validateRegisterFields(username, password, password2) {
  // Checks for username minimum length
  if (username.length < 8) return 'El usuario debe tener al menos 8 caracteres'

  // Checks for password minimum length
  if (password.length < 8)
    return 'La contraseña debe tener al menos 8 caracteres'

  // Checks for at least one uppercase character in password
  let regex = /.*[A-Z].*/
  if (!regex.test(password))
    return 'La contraseña debe contener al menos un  caracter en mayúsculas'

  // Checks for at least one numeric character in password
  regex = /.*\d.*/
  if (!regex.test(password))
    return 'La contraseña debe contener al menos un caracter numerico'

  if (password !== password2) return 'Ambas contraseñas deben ser identicas'
}
