import './navbar.css'
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar () {
  const [cookies] = useCookies(["token"])
  return (
    <div className='nav'>
      <div className='site-title-div'>
        <Link to='/' className='site-title-link'>
          <h1>Blog Admin</h1>
        </Link>
      </div>
      <ul className='nav-links'>
        <li className='active'>
          <Link to='/admin/post/create' className=''>
            Create Post
          </Link>
        </li>
        <li className=''>
          <Link to='/admin/posts' className=''>
            Manage Posts
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
