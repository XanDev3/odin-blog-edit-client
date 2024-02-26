import { useState, useEffect } from 'react'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'
import useComments from '../hooks/useComments'
import { FaX } from 'react-icons/fa6'

const Comments = ({ postId }) => {
  const { comments, setComments } = useComments()
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [confirmDeleteShow, setConfirmDeleteShow] = useState({})
  const { auth } = useAuth()
  const [parentPostId, setParentPostId] = useState(postId)
  const [updateComments, setUpdateComments] = useState(false)
  useEffect(() => {
    console.log('initial postId', parentPostId)
    axios
      .get(`posts/${parentPostId}/comments`)
      .then(response => {
        setComments(response.data.allComments)
        setIsLoading(false)
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else if (err.response?.status === 500) {
          setErrMsg('Could not retrieve comments')
        } else {
          setErrMsg('Get allComments Failed')
        }
      })
  }, [updateComments])
  const handleShow = id => {
    setConfirmDeleteShow({ ...confirmDeleteShow, [id]: !confirmDeleteShow[id] })
  }
  const handleClose = id => {
    setConfirmDeleteShow({ ...confirmDeleteShow, [id]: !confirmDeleteShow[id] })
  }
  const handleConfirm = () => {
    console.log('delete')
  }
  const addComment = id => {
    console.log('id', id)
    setConfirmDeleteShow(confirmDeleteShow => ({
      ...confirmDeleteShow,
      [id]: false
    }))
  }
  useEffect(() => {
    comments.map(comment => {
      setConfirmDeleteShow(confirmDeleteShow => ({
        ...confirmDeleteShow,
        [comment._id]: false
      }))
    })
  }, [comments])

  if (isLoading) {
    return <p>Loading...</p>
  } else if (comments.length < 1) {
    return (
      <p className='comments-section-empty'>This post has no comments yet...</p>
    )
  } else {
    return (
      <section className='comments-section'>
        {comments.map(comment => {
          const date = new Date(comment.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })

          return (
            <article key={comment._id} className='comment-card'>
              <button
                className='close-icon-btn'
                onClick={() => handleShow(comment._id)}
              >
                <FaX className='close-icon' />
              </button>

              <h5 className='comment-author'>
                {comment?.author.username} said:
              </h5>
              <div className='comment-card-content'>{comment.content}</div>
              <div className='comment-card-date'>{date}</div>
              {confirmDeleteShow[comment._id] ? (
                <div className='comment-delete-modal'>
                  <p className='modal-text'>
                    Are you sure you want to delete this comment?
                  </p>
                  <div className='modal-btn-container'>
                    <button
                      className='delete-btn modal-btn'
                      onClick={handleConfirm}
                    >
                      Delete
                    </button>
                    <button
                      className='cancel-btn modal-btn'
                      onClick={() => handleClose(comment._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </article>
          )
        })}
      </section>
    )
  }
}

export default Comments
