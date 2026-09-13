import React from 'react'
import useUserstore from '../userStore'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {

    const {currentUser} = useUserstore()
  return currentUser ? <Navigate to='/' replace /> : <Outlet />
}

export default PublicRoute