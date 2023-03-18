import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfileBar from '../components/ProfileBar.jsx'
import Thread from '../components/Thread.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

export default function ThreadPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { idthread, title } = useParams()

  // Checks if user is authenticated and redirects to login
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <div className="thread-page">
      <ProfileBar></ProfileBar>
      <Thread idthread={idthread} title={title}></Thread>
    </div>
  )
}
