import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../lib/axios'
import useAuth from '../hooks/useAuth'




function ManagePosts () {
  const [posts, setPosts] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()

  useEffect(() => {
    axios
      .get('posts')
      .then(response => {
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

  function extractText (contentStr) {
    const text = contentStr.replace(/(<([^>]+)>)|(&nbsp;|&#160;)/gi, "")
    return text
  }

  function handlePublish (post) {
    const postId = post._id
    const newPub = !post.isPublished

    axios
      .put(
        `posts/${postId}`,
        {
            title: post.title,
            content: post.content,
            isPublished: newPub
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        },
      )
      .then(response => {
        if (response.status === 200) {
          console.log('successful update')
          const returnedPost = response.data.updatedPost
          // replace the post in state with that returned post and return the rest
          const nextPosts = posts.map((p)=>{
            if(p._id === post._id) return returnedPost
            else return p
          })
          //set new state with the post replaced
          setPosts(nextPosts)
        } else {
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
          setErrMsg('Login Failed')
        }
      })
  }

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
                <p>
                {extractText(post.content)}
                </p>
                <Link to={`/admin/posts/${post._id}/update`}>
                  <button className='edit-btn'>Edit</button>
                </Link>
                {post.isPublished === true ? (
                  <>
                    <button
                      onClick={() => handlePublish(post)}
                      className='unpublish-btn'
                    >
                      Unpublish
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handlePublish(post)}
                    className='publish-btn'
                  >
                    Publish
                  </button>
                )}
                <Link to={`/admin/posts/${post._id}/delete`}>
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
