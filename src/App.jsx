import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './App.css'
import Navbar from './layouts/Navbar.jsx'
import Layout from './layouts/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import CreatePost from './components/CreatePost.jsx'
import ManagePosts from './components/ManagePosts.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Missing from './components/Missing.jsx'

function App () {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/*  protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
        
          <Route path='admin/post/create' element={<CreatePost />} />
        
          <Route path='admin/posts' element={<ManagePosts />} />
        </Route>
        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
