import { useEffect, useState } from 'react'
import { getPosts, newPost } from '../services/post-services.js'
import { useAuth } from '../hooks/useAuth.jsx'
import Post from './Post.jsx'
import LocationHeader from './LocationHeader.jsx'
import QuillEditor from './QuillEditor.jsx'
import './Thread.css'

export default function Thread(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [postsData, setPostsData] = useState(null)
  const [isEditorVisible, setIsEditorVisible] = useState(false)
  const [lastPostID, setLastPostID] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts(props.idthread)
      setPostsData(JSON.parse(data.body.rows))
      setIsLoading(false)
    }
    loadPosts()
  }, [lastPostID])

  function toggleNewPostVisible() {
    setErrorMessage(null)
    setIsEditorVisible(!isEditorVisible)
  }

  async function handleNewPost(content) {
    const res = await newPost(props.idthread, user.id, content)

    if (res.ok) {
      setIsEditorVisible(false)
      // lastPost is inside useEffect dependency array. This forces re-fetch thread
      const id = res.body.id
      setLastPostID(id)
    } else {
      setErrorMessage(res.body.message)
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="thread">
      <LocationHeader path={['Foro', props.title]}></LocationHeader>
      <div className="thread-content">
        {postsData.map((post) => {
          return <Post key={post.id} {...post} />
        })}
        <button type="button" onClick={() => toggleNewPostVisible()}>
          Nueva Respuesta
        </button>
      </div>
      {isEditorVisible && (
        <div className="post-editor">
          {isEditorVisible && (
            <QuillEditor
              handleNewPost={handleNewPost}
              errorMessage={errorMessage}
            ></QuillEditor>
          )}
        </div>
      )}
    </div>
  )
}
