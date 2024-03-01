import './navbar.css'
import { useState } from 'react'
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

function Navbar () {
  const { auth, setAuth } = useAuth()
  const [isAccountMenuExpanded, setAccountMenuExpansion] = useState(false)
  const navigate = useNavigate()

  const handleLogout = e => {
    e.preventDefault()

    axios
      .get('/logout')
      .then(response => {
        if (response.status === 200) {
          console.log('successful logout')
          setAuth({})
          navigate('/')
        } else {
          throw new Error('Failed to log out')
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
          setErrMsg('Logout Failed')
        }
      })
  }
  return (
    <div className='nav'>
      <div className='site-title-div'>
        <Link to='/' className='site-title-link'>
          <h1>Blog Admin</h1>
        </Link>
      </div>
      <ul className='nav-links'>
        <CustomLink to='/admin/post/create'>Create Post</CustomLink>
        <CustomLink to='/admin/posts'>Manage Posts</CustomLink>
        {auth.token ? (
          <div className='profile-div'>
            <button
              id='open-user-menu'
              className='profile-btn'
              onClick={() => {
                setAccountMenuExpansion(prev => !prev)
              }}
            >
              <img
                src='./user.png'
                alt=''
                className='profile-icon'
              ></img>
              {/* <span className='text-base text-gray-300'>
              <i
                className='fa fa-chevron-down ml-2 thin-icon'
                aria-hidden='true'
              ></i>
            </span> */}
            </button>
            <div className='menu-container'>
              {isAccountMenuExpanded && (
                <div className='acct-menu'>
                  <form onSubmit={handleLogout}>
                    <button className='logout-btn'>Log Out</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

function CustomLink ({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar
