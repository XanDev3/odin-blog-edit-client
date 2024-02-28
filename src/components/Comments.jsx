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
  const [successfulDelete, setSuccessfulDelete] = useState(false)

  useEffect(() => {
    console.log('initial postId', parentPostId)
    axios
      .get(`posts/${parentPostId}/comments`)
      .then(response => {
        setComments(response.data.allComments)
        setIsLoading(false)
        setSuccessfulDelete(false)
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
  }, [successfulDelete, auth.token])

  useEffect(() => {
    comments.map(comment => {
      setConfirmDeleteShow(confirmDeleteShow => ({
        ...confirmDeleteShow,
        [comment._id]: false
      }))
    })
  }, [])

  const toggleConfirm = id => {
    setConfirmDeleteShow({ ...confirmDeleteShow, [id]: !confirmDeleteShow[id] })
  }

  const handleDelete = commentId => {
    console.log('delete')
    axios
      .delete(`/posts/${parentPostId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log('successful delete')
          console.log(response.data)
          /* setComments(prevComments => {
           prevComments.filter(comment => {
              comment._id !== response.data.commentToDelete._id
            })
          }) */
          setSuccessfulDelete(true)
        } else {
          throw new Error('Failed to delete comment')
        }
      })
      .then(console.log(comments))
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else {
          setErrMsg('Delete Failed')
        }
      })
  }
 /*  const addComment = id => {
    console.log('id', id)
    setConfirmDeleteShow(confirmDeleteShow => ({
      ...confirmDeleteShow,
      [id]: false
    }))
  } */

  if (isLoading) {
    return <p>Loading...</p>
  } else if (comments?.length < 1) {
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
                type='button'
                className='close-icon-btn'
                onClick={() => toggleConfirm(comment._id, event)}
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
                      type='button'
                      className='delete-btn modal-btn'
                      onClick={() => handleDelete(comment._id)}
                    >
                      Delete
                    </button>
                    <button
                      type='button' /*  */
                      className='cancel-btn modal-btn'
                      onClick={() => toggleConfirm(comment._id, event)}
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
        {/* {successfulDelete && <p>Successfully deleted comment!</p>} */}
      </section>
    )
  }
}

export default Comments
