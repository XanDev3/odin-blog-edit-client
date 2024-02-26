import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import usePost from '../hooks/usePost'
import useComments from '../hooks/useComments'

export default function TinyMceEditor ({ initialValue, limit }) {
  const sizeLimit = limit ?? 100
  const { post, setPost } = usePost()
  const { comments, setComments } = useComments()
  const [value, setValue] = useState(
    initialValue ?? 'Include your blog post content here'
  )
  const [text, setText] = useState('')
  const [length, setLength] = useState(0)
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  const handleInit = (evt, editor) => {
    editorRef.current = editor // from basic deployment
    setLength(editor.getContent({ format: 'text' }).length) //A method for retrieving the character count in the textarea
    setValue(initialValue ?? 'Include your blog post content here')
  }
  const handleUpdate = (value, editor) => {
    const length = editor.getContent({ format: 'text' }).length
    const text = editor.getContent()
    if (length <= sizeLimit) {
      setValue(value)
      setLength(length)
      setPost(prev => ({ ...prev, content: text }))
    }
  }
  const handleContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent({ format: 'text' }))
    }
  }
  const returnContent = () => {
    return editor.getContent({ format: 'text' })
  }
  const handleBeforeAddUndo = (evt, editor) => {
    const length = editor.getContent({ format: 'text' }).length
    // note that this is the opposite test as in handleUpdate
    // because we are determining when to deny adding an undo level
    if (length > sizeLimit) {
      evt.preventDefault()
    }
  }
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={handleInit}
        initialValue={initialValue}
        value={value}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          font_family_formats:
            'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Josefin Sans=josefin sans; Lora=lora; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Varela=varela; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&family=Lora:ital,wght@1,400..700&family=Varela&display=swap'); body { font-family:Josefin Sans,Helvetica,Arial,Lora,Varela,sans-serif; font-size:14px }; h1,h2,h3,h4 { font-family: 'Josefin Sans';}",
          width: '70vw',
          skin: 'oxide-dark',
          content_css: 'dark'
        }}
      />
      <p className='tox-p'>Remaining: {sizeLimit - length}</p>
      {/*       <button type='button' onClick={log}>
        Log editor content{}
      </button> */}
    </>
  )
}
