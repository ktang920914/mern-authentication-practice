import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './components/Header'
import useUserstore from './userStore'
import ProtectRoute from './components/ProtectRoute'
import PublicRoute from './components/PublicRoute'


const App = () => {

  const {currentUser} = useUserstore()
  return (
    <>
    {currentUser && <Header/>}
      <Routes>

        <Route element={<ProtectRoute />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App