import { useEffect, useState } from 'react'
import { getPosts, newPost } from '../services/post-services.js'
import './Thread.css'
import Post from './Post.jsx'
import LocationHeader from './LocationHeader.jsx'
import QuillEditor from './QuillEditor.jsx'

export default function Thread(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [postsData, setPostsData] = useState(null)
  const [isEditorVisible, setIsEditorVisible] = useState(false)
  const [lastPostID, setLastPostID] = useState(0)

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts(props.idthread)
      setPostsData(JSON.parse(data))
      setIsLoading(false)
    }
    loadPosts()
  }, [lastPostID])

  async function handleNewPost(content) {
    const res = await newPost(props.idthread, 1, content)
    const id = res.id
    // console.log('post id:  ', id)
    setIsEditorVisible(false)
    // lastPost is inside useEffect dependency array. This forces re-fetch thread
    setLastPostID(id)
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="thread">
      <LocationHeader path={['Foro', props.title]}></LocationHeader>
      <div className="thread-content">
        <button
          type="button"
          onClick={() => setIsEditorVisible(!isEditorVisible)}
        >
          Nueva Respuesta
        </button>
        {postsData.map((post) => {
          return <Post key={post.id} {...post} />
        })}
        <button
          type="button"
          onClick={() => setIsEditorVisible(!isEditorVisible)}
        >
          Nueva Respuesta
        </button>
      </div>
      {isEditorVisible && (
        <div className="post-editor">
          {isEditorVisible && (
            <QuillEditor handleNewPost={handleNewPost}></QuillEditor>
          )}
        </div>
      )}
    </div>
  )
}
