import { useState, useEffect } from 'react'
import TinyMceEditor from './TinyMceEditor'
import { FaX } from 'react-icons/fa6'

const Comment = (comment, { setUpdateComments }) => {
  const [editing, setEditing] = useState(false)

  const onSubmit = () => {
    setEditing = false
    setUpdateComments(updateComments => {
      !updateComments
    })
  }
  const date = new Date(comment.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return (
    <>
      {editing ? (
        <article className='comment-card'>
          <FaX className='close-icon' />
          <h5 className='comment-author'>{comment?.author.username} said:</h5>
          <div className='comment-card-content'>{comment.content}</div>
          <div className='comment-card-date'>{date}</div>
        </article>
      ) : (
        <article className='comment-card'>
          <FaX className='close-icon' />
          <h5 className='comment-author'>{comment?.author.username} said:</h5>
          <TinyMceEditor
            limit='500'
            className='tinymce'
            initialValue={comment.content}
          ></TinyMceEditor>
          <div className='comment-card-date'>{date}</div>
        </article>
      )}
    </>
  )
}

export default Comment
