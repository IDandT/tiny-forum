import './Post.css'
import HTMLReactParser from 'html-react-parser'
import 'react-quill/dist/quill.core.css'
import imgAvatar from '../assets/default-avatar.png'

export default function Post(props) {
  return (
    <div className="post">
      <div className="topbar simple-linear">
        <div className="user">
          <img className="user-avatar" src={imgAvatar} width="48" height="48" />
          <div className="user-name">{props.username}</div>
        </div>
        <div className="datetime">
          <div className="date">{props.create_date}</div>
          <div className="hour">{props.create_time}</div>
        </div>
      </div>
      <div className="ql-editor">{HTMLReactParser(props.body)}</div>
    </div>
  )
}
