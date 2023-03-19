import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { getTopics, newTopic } from '../services/topic-services.js'
import NewTopic from './NewTopic.jsx'
import Topic from './Topic.jsx'
import './Forum.css'

export default function Forum() {
  const [isLoading, setIsLoading] = useState(true)
  const [topicsData, setTopicsData] = useState(null)
  const [isNewTopicVisible, setIsNewTopicVisible] = useState(false)
  const [lastTopicID, setLastTopicID] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    async function loadTopics() {
      const data = await getTopics()

      setTopicsData(JSON.parse(data.body.rows))
      setIsLoading(false)
    }
    loadTopics()
  }, [lastTopicID])

  function toggleNewTopicVisible() {
    setErrorMessage(null)
    setIsNewTopicVisible(!isNewTopicVisible)
  }

  async function handleNewTopic(title, description) {
    const res = await newTopic(title, description)
    console.log(res)
    if (res.ok) {
      setIsNewTopicVisible(false)
      // lastTopic is inside useEffect dependency array. This forces re-fetch thread
      console.log(res.body.id)
      const id = res.body.id
      setLastTopicID(id)
    } else {
      setErrorMessage(res.body.message)
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="forum">
      <div className="forum-topic-list">
        <div className="forum-topic-list-header forum-topic-row">
          <div className="forum-topic-col-1">Tema</div>
          <div className="forum-topic-col-2">Mensajes</div>
          <div className="forum-topic-col-2">Ultimo Post </div>
        </div>
        {topicsData.map((topic) => {
          return <Topic key={topic.id} {...topic} />
        })}
      </div>
      {Boolean(user.admin) && (
        <button type="button" onClick={() => toggleNewTopicVisible()}>
          Nuevo Tema
        </button>
      )}
      {isNewTopicVisible && (
        <div className="new-topic-editor">
          <NewTopic
            handleNewTopic={handleNewTopic}
            errorMessage={errorMessage}
          ></NewTopic>
        </div>
      )}
    </div>
  )
}
