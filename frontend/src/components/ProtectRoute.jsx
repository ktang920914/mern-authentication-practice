import React from 'react'
import useUserstore from '../userStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {

    const {currentUser} = useUserstore()
  return currentUser ? <Outlet /> : <Navigate to='/signin' replace />
}

export default ProtectRoute