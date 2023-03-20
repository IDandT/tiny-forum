import { useParams } from 'react-router-dom'
import ProfileBar from '../components/ProfileBar.jsx'
import Thread from '../components/Thread.jsx'

export default function ThreadPage() {
  const { idthread, title } = useParams()

  return (
    <div className="thread-page">
      <ProfileBar></ProfileBar>
      <Thread idthread={idthread} title={title}></Thread>
    </div>
  )
}
