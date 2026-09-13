import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import useUserstore from '../userStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const {currentUser, signOutSuccess} = useUserstore()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await fetch('/api/auth/signout',{
            method:'POST'
        })
        const data = await res.json()
        if(data.success === true){
            signOutSuccess()
        }
    }
  return (
    <div className='p-3'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>Authentication</h1>

            <div className='flex gap-2'>
                <TextInput type='text' value={currentUser.username} disabled/>
                <Button className='cursor-pointer' onClick={handleLogout}>LOGOUT</Button>
            </div>
        </div>
    </div>
  )
}

export default Header