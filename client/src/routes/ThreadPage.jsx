import { useParams } from 'react-router-dom'
import Thread from '../components/Thread.jsx'

export default function ThreadPage() {
  const { idthread, title } = useParams()

  return (
    <div className="thread-page">
      <h1>Tiny Forum</h1>
      <Thread idthread={idthread} title={title}></Thread>
    </div>
  )
}
