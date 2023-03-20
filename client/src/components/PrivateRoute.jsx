import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

// Only navigates to childen if user is authenticated
// If not user auth, redirects to Login Page
export default function PrivateRoute({ children }) {
  const auth = useAuth()
  return auth.user ? <>{children}</> : <Navigate to="/login" />
}
