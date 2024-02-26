import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'


const Layout = () => {
  return (
    <>
      <Navbar />
      <main className='body-container'>
        <Outlet />
      </main>
    </>
    
  )
}

export default Layout
