import './navbar.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Navbar () {
  const [cookies] = useCookies(['token'])
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
