import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { validateRegisterFields } from '../utils/input-validator.js'
import './Auth.css'

// Register page component
export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [message, setMessage] = useState('')
  const [isRegisterOk, setRegisterOk] = useState(false)
  const { user, register } = useAuth()
  const navigate = useNavigate()

  // Checks if user is authenticated and redirects to home if it is
  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user])

  // Validate input fields, and shows a result message in page
  // If all conditions are ok, call the registration useAuth method
  async function registerClickHandler(username, password, password2) {
    const validacion = validateRegisterFields(username, password, password2)
    if (validacion) {
      setMessage(validacion)
      return
    }
    const result = await register(username, password)
    setRegisterOk(result.ok)
    setMessage(result.message)
  }

  function onFormSubmit(e) {
    e.preventDefault()
    registerClickHandler(username, password, password2)
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <div className="auth-box">
        <span className="auth-title">Registro de usuario</span>
        <form onSubmit={onFormSubmit}>
          <div className="auth-fields">
            <div className="auth-field">
              <span className="auth-field-name">Usuario:</span>
              <input
                type="text"
                placeholder="Introduzca el usuario..."
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                maxLength="20"
              ></input>
            </div>
            <div className="auth-field">
              <span className="auth-field-name">Contraseña:</span>
              <input
                type="password"
                placeholder="Introduzca la contraseña..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                maxLength="20"
              ></input>
            </div>
            <div className="auth-field">
              <span className="auth-field-name">Confirmar contraseña:</span>
              <input
                type="password"
                placeholder="Repita la contraseña..."
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                maxLength="20"
              ></input>
            </div>
            <div
              className={isRegisterOk ? 'auth-response-ok' : 'auth-response'}
            >
              <span>{message}</span>
            </div>
            <div className="buttons">
              <button type="submit" disabled={isRegisterOk}>
                Registrarse
              </button>
            </div>
            <div className="auth-link">
              <Link to="/login">Ya tiene cuenta? Entre aquí!</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
