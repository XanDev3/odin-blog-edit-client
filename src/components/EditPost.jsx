import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'
import usePost from '../hooks/usePost'
import TinyMceEditor from './TinyMceEditor'
import Comments from './Comments'

function EditPost () {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const { post, setPost } = usePost()
  const {id} = useParams()

  useEffect(() => {
    axios.get(`/posts/${id}`)
    .then(response => {
        if (response.status === 200) {
/*           console.log('successful get')
          console.log(response.data.post) */
          setPost(response.data.post)
        } else {
          throw new Error('Failed to get post')
        }
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else {
          setErrMsg('Login Failed')
        }
      })
  }, [id])
  
  const handleTextChange = event => {
    const { name, value } = event.target
    setPost(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleCheckbox = event => {
    setPost(prev => ({
      ...prev,
      isPublished: !prev.isPublished
    }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(post)
    axios
      .put(
        `/posts/${id}`,
        {
          title: post.title,
          content: post.content,
          isPublished: post.isPublished
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(response => {
        if (response.status === 200) {
          console.log('successful create')
          navigate('/admin/posts')
        }
        else{
          throw new Error('Failed to update post')
        }
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else {
          setErrMsg('Update Failed')
        }
      })
  }
  return (
    <>
      <h1 className='create-post-h1'>Update Post</h1>
      <form onSubmit={handleSubmit} className='create-post-form'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            className='create-post-input'
            id='title'
            name='title'
            value={post.title}
            onChange={handleTextChange}
          />
          <label htmlFor='checkbox'>Publish Post?</label>
          <input
            className='create-post-checkbox'
            type='checkbox'
            checked={post.isPublished}
            onChange={handleCheckbox}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Post Content</label>
          <TinyMceEditor limit='5000' className='tinymce' initialValue={post.content}></TinyMceEditor>
        </div>
        {/* setting button to button for testing/validating data until enabling submitting the form */}
        <div className='form-group'>
          <button type='submit' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      <Comments postId={id}></Comments>
    </>
  )
}

export default EditPost
