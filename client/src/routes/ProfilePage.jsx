import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { uploadAvatarFile } from '../services/upload-services.js'
import Avatar from '../components/Avatar.jsx'
import './ProfilePage.css'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

// Home page component. Its entry point of our site when
// the user is authenticated successfully
export default function ProfilePage() {
  const { user, logout, updateUserData } = useAuth()
  const [uploadError, setUploadError] = useState('')
  const [imageURL, setImageURL] = useState()
  const navigate = useNavigate()

  // Load avatar image
  useEffect(() => {
    setImageURL(user.avatar)
  }, [user])

  // If user press logout button, close session calling logout
  // method of the useAuth custom hook. Then redirects to login
  function handleLogout() {
    logout()
    navigate('/login')
  }

  // Upload avatar. Select image file and upload to server
  // The server path to file will be saved on 'users' table
  async function uploadHandler(event) {
    event.preventDefault()
    const result = await uploadAvatarFile(user.username, event.target.files[0])

    // Show result message
    setUploadError(result.body.message)

    // Update user globally in context, and set local url for show new image
    const newUser = user
    newUser.avatar = `${API_ENDPOINT}/avatars/${result.body.filename}`
    setImageURL(newUser.avatar)
    updateUserData(newUser)
  }

  if (!user) {
    return 'Loading...'
  }

  return (
    <div>
      <h1>Perfil</h1>
      <div className="profile">
        <h3 className="profile-username">{user.username}</h3>
        <Avatar imageURL={imageURL} imageWidth={200} imageHeight={200} />
        <form>
          <input
            id="file-picker"
            type="file"
            name="avatar"
            onChange={uploadHandler}
            hidden
          />
          <button
            className="button-upload-avatar"
            onClick={(event) => {
              event.preventDefault()
              document.getElementById('file-picker').click()
            }}
          >
            Subir Avatar
          </button>
          <p className="profile-upload-error">{uploadError}</p>
        </form>
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}
