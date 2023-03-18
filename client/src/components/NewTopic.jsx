import { useState } from 'react'
import './NewTopic.css'

export default function NewTopic(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="topic-editor">
      <div className="top-title">Nuevo Tema</div>
      <div className="field">
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="80"
        ></input>
      </div>
      <div className="field">
        Descripción:
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="250"
        ></textarea>
      </div>
      {props.errorMessage && (
        <div className="topic-error-message">{props.errorMessage}</div>
      )}
      <button
        type="button"
        onClick={() => props.handleNewTopic(title, description)}
      >
        Crear Tema
      </button>
    </div>
  )
}
