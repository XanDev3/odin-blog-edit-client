import React, { useRef, useState, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import usePost from '../hooks/usePost'
import useComments from '../hooks/useComments'
import Prism from 'prismjs';

const charCount = editor => editor.getContent({ format: 'text' }).length

export default function TinyMceEditor ({ initialContent, limit }) {
  const sizeLimit = limit ?? 100
  const { post, setPost } = usePost()
  const { comments, setComments } = useComments()
  const [value, setValue] = useState(
    initialContent ?? '<p>Type Blog Post content here...</p>'
  )
  /*   const [text, setText] = useState('') */
  const [length, setLength] = useState(0)
  const editorRef = useRef(null)

  const log = () => {
    if (editorRef.current) {
      //console.log(editorRef.current.getContent())
    }
  }
  const handleInit = (evt, editor) => {
    editorRef.current = editor
    setLength(editor.getContent({ format: 'text' }).length)
    //A method for retrieving the character count in the textarea
  }
  const handleUpdate = (value, editor) => {
    const length = charCount(editor)
    const text = editor.getContent({ format: 'text' })
    if (length <= sizeLimit) {
      setValue(value)
      setLength(length)
      setPost(post => ({ ...post, content: value }))
    }
    console.log(value)
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
        //this initialValue has to not be passed from another component
        initialValue='<p>Type Blog Post content here...</p>'
        value={initialContent}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'anchor',
            'autolink',
            'code',
            'codesample', 
            'charmap',
            'emoticons',
            'fullscreen',
            'insertdatetime',
            'image',
            'lists',
            'advlist',
            'linkchecker',
            'link',
            'image',
            'preview',
            'pagebreak',
            'searchreplace',
            'media',
            'table',
            'help',
            'visualblocks',
            'wordcount',
          ],
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'Solidity', value: 'solidity' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' }
          ],
/*           pre_process: (editorRef, el) => {
            Prism.highlightAllUnder(editorRef);
          }, */
          toolbar:
            'undo redo | styles | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons | help',
          font_family_formats:
            'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Josefin Sans=josefin sans; Lora=lora; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Varela=varela; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
/*           content_style:
            `@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&family=Lora:ital,wght@1,400..700&family=Varela&display=swap'); 
            body { font-family:Josefin Sans,Helvetica,Arial,Lora,Varela,sans-serif,'Roboto', serif; font-size:14px }; 
            h1,h2,h3,h4 { font-family: 'Josefin Sans';}
            img {
                 height: auto;
                 margin: auto;
                 padding: 10px;
                 display: block;
             }
            img.medium {
                 max-width: 25%;
             }
             a { 
                 color:#116B59;
             }
             .related-content {
                 padding:0 10px;
                 margin: 0 0 15px 15px;
                 background:#eee;
                 width:200px;
                 float:right;
             }`, */
/*           valid_classes: {
            img: "medium",
            div: "related-content"
          }, */
          width: '70vw',
          skin: 'oxide-dark',
          content_css: 'dark',
        }}
      />
      <p className='tox-p'>Remaining: {sizeLimit - length}</p>
      {/*       <button type='button' onClick={log}>
        Log editor content{}
      </button> */}
    </>
  )
}
