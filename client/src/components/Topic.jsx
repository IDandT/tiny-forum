import { useNavigate } from 'react-router-dom'
import './Topic.css'

export default function Topic(props) {
  const navigate = useNavigate()

  const clickHandler = (id, title) => {
    navigate(`/thread/${id}/${title}`)
  }

  return (
    <div
      className="topic-row"
      onClick={() => clickHandler(props.id, props.title)}
    >
      <div className="topic-col-1">
        {props.title}
        <br></br>
        <span className="topic-desc">{props.description}</span>
      </div>
      <div className="topic-col-2">{props.msgcount}</div>
      <div className="topic-col-2">
        {props.lastpostby}
        <br></br>
        {props.last_date}
      </div>
    </div>
  )
}
