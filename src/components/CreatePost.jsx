import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'
import usePost from '../hooks/usePost'
import TinyMceEditor from './TinyMceEditor'

function CreatePost () {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const { post, setPost } = usePost()
  const errRef = useRef()

  const [errMsg, setErrMsg] = useState('')
  

  //clear out old post state on first render
  useEffect(() => {
    setPost({
      title: '',
      content: '',
      isPublished: false
    })
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [post.title, post.content]) 
  
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

    axios
      .post(
        '/posts',
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
          throw new Error('Failed to create post')
        }
      })
      .catch(err => {
        if (!err?.response) {
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400) {
          setErrMsg(`${err.response.data.errors[0]}`)
          
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized')
        } else {
          setErrMsg('Post Create Failed')
        }
      })
  }
  return (
    <>
      <h1 className='create-post-h1'>Create New Post</h1>
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
          <br />
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
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live='assertive'
        >
        {errMsg}
        </p>
          <TinyMceEditor limit='5000' className='tinymce'></TinyMceEditor>
        </div>
        {/* setting button to button for testing/validating data until enabling submitting the form */}
        <div className='form-group'>
          <button type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
      
    </>
  )
}

export default CreatePost
