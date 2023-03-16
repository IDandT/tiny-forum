import { useEffect, useState } from 'react'
import { getTopics, newTopic } from '../services/topic-services.js'
import './Forum.css'
import NewTopic from './NewTopic.jsx'
import Topic from './Topic.jsx'

export default function Forum() {
  const [isLoading, setIsLoading] = useState(true)
  const [topicsData, setTopicsData] = useState(null)
  const [isNewTopicVisible, setIsNewTopicVisible] = useState(false)
  const [lastTopicID, setLastTopicID] = useState(0)

  useEffect(() => {
    async function loadTopics() {
      const data = await getTopics()

      setTopicsData(JSON.parse(data))
      setIsLoading(false)
    }

    loadTopics()
  }, [lastTopicID])

  async function handleNewTopic(title, description) {
    const res = await newTopic(title, description)
    const id = res.id
    // console.log('post id:  ', id)
    setIsNewTopicVisible(false)
    // lastPost is inside useEffect dependency array. This forces re-fetch thread
    setLastTopicID(id)
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
      <button
        type="button"
        onClick={() => setIsNewTopicVisible(!isNewTopicVisible)}
      >
        Nuevo Tema
      </button>
      {isNewTopicVisible && (
        <div className="new-topic-editor">
          <NewTopic handleNewTopic={handleNewTopic}></NewTopic>
        </div>
      )}
    </div>
  )
}
