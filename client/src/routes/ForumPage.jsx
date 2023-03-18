import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import Forum from '../components/Forum.jsx'
import ProfileBar from '../components/ProfileBar.jsx'

export default function ForumPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Checks if user is authenticated and redirects to login
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  if (!user) {
    return 'Loading...'
  }

  return (
    <div className="forum-page">
      <ProfileBar></ProfileBar>
      <Forum></Forum>
    </div>
  )
}
