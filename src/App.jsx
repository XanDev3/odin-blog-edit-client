import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './App.css'
import Navbar from './layouts/Navbar.jsx'
import Layout from './layouts/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import CreatePost from './components/CreatePost.jsx'
import ManagePost from './components/ManagePost.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Missing from './components/Missing.jsx'

function App () {
  return (
    <><Navbar />
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<Login />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/*  protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='admin/post/create' element={<CreatePost />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='admin/posts' element={<ManagePost />} />
        </Route>
        {/* catch all */}
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
