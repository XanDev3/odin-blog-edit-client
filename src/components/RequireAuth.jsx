import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'

const RequireAuth = () => {
  const { auth } = useAuth()
  const location = useLocation()

  return auth?.isAdmin ? (
    <Outlet />
  ) : auth?.token ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
