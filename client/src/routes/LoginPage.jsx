import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import './Auth.css'

// Login page component
export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { user, login } = useAuth()
  const navigate = useNavigate()

  // Checks if user is authenticated and redirects to home if it is
  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [user])

  // Call the login method of the useAuth custom hook
  // If is ok redirects to home. If not, shows info message
  async function loginClickHandler(username, password) {
    const result = await login(username, password)
    if (result.ok) {
      navigate('/home')
    } else {
      setMessage(result.message)
    }
  }

  function onFormSubmit(e) {
    e.preventDefault()
    loginClickHandler(username, password)
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <div className="auth-box">
        <span className="auth-title">Inicio de sesión</span>
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
            <div className="auth-response">
              <span>{message}</span>
            </div>
            <div className="buttons">
              <button type="submit">Iniciar sesión</button>
            </div>
            <div className="auth-link">
              <Link to="/register">Aún no tiene cuenta? Regístrese!</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
