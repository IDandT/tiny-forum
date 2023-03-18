import { useAuth } from '../hooks/useAuth.jsx'
import defaultImgAvatar from '../assets/default-avatar.png'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import './ProfileBar.css'

export default function ProfileBar(props) {
  const { user } = useAuth()
  const navigate = useNavigate()

  function clickHandler() {
    navigate('/profile')
  }

  return (
    <div className="profile-bar">
      <div className="title">
        <h1>Tiny Forum</h1>
      </div>
      <div className="profile-bar-user" onClick={clickHandler}>
        <h4>{user.username}</h4>
        <Avatar
          imageURL={
            user
              ? user.avatar !== ''
                ? user.avatar
                : defaultImgAvatar
              : defaultImgAvatar
          }
          imageWidth={48}
          imageHeight={48}
        />
      </div>
    </div>
  )
}
