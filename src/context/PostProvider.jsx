import { createContext, useState } from 'react'

const PostContext = createContext({})

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    isPublished: false
  })

  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
