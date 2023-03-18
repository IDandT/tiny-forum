import { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './QuillEditor.css'

export default function QuillEditor(props) {
  const [editorValue, setEditorValue] = useState('')
  const editorRef = useRef(null)

  const modules = {
    toolbar: [
      [
        { size: ['small', false, 'large', 'huge'] },
        'bold',
        'italic',
        'underline',
        'blockquote',
      ],
      [{ color: [] }, { background: [] }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],
      ['link', 'image'],
    ],
  }

  const formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'blockquote',
    'align',
    'link',
    'image',
    'color',
    'background',
  ]

  // function printHTML() {
  //   console.log(editorValue)
  // }

  return (
    <div className="qre-container">
      <ReactQuill
        ref={editorRef}
        className="qre-editor"
        theme="snow"
        value={editorValue}
        onChange={setEditorValue}
        modules={modules}
        formats={formats}
      ></ReactQuill>
      {props.errorMessage && (
        <div className="post-error-message">{props.errorMessage}</div>
      )}
      <button
        className="qre-button"
        type="button"
        onClick={() =>
          props.handleNewPost(editorRef.current.getEditor().root.innerHTML)
        }
      >
        Publicar Comentario
      </button>
    </div>
  )
}
