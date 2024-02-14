import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'
//TODO create a hook to publish and unpublish posts

function ManagePosts () {
  const [posts, setPosts] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()

  useEffect(() => {
    axios
      .get('api/posts')
      .then(response => {
        console.log('posts: ', response.data)
        const post1 = response.data.allPosts[0]._id
        console.log('post1: ', post1)
        setPosts(response.data.allPosts)
        setIsLoading(false)
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
  }, [])

  return (
    <>
      <h1 className='posts-h1'>Manage Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='posts-grid'>
          <div className='grid-header'>
            <p>Title</p>
            <p>Content</p>
            <p>Actions</p>
          </div>
          {posts.map(post => {
            return (
              <div key={post._id} className='post-card'>
                <p>{post.title}</p>
                <p>{post.content}</p>
                <Link to={`/posts/${post._id}/update`}>
                  <button className='edit-btn'>Edit</button>
                </Link>
                {post.isPublished === true ? (
                  <Link to={`/posts/${post._id}/update`}>
                    <button className='unpublish-btn'>Unpublish</button>
                  </Link>
                ) : (
                  <Link to={`/posts/${post._id}/update`}>
                    <button className='publish-btn'>Publish</button>
                  </Link>
                )}
                {/* TODO - create third button to publish and unpublish posts */}
                <Link to={`/posts/${post._id}/delete`}>
                  <button className='delete-btn'>Delete</button>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ManagePosts
