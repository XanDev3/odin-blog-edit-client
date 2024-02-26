import React from 'react'
import useAuth from '../hooks/useAuth'

function Home () {
  const { auth } = useAuth()

  return (
    <>
      <h1>Welcome {auth?.user}</h1>
      <p>
        Please use the links above to create new blog posts or manage existing
        ones.
      </p>
    </>
  )
}

export default Home
