import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to='/login' />
  }


  // If authenticated, render the child routes

  // The Outlet component acts as a placeholder that displays the child components defined in the parent route.
  return <Outlet />

}

export default ProtectedRoute