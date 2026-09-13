import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserstore from '../userStore'

const Signin = () => {

    const {signInSuccess} = useUserstore()
    const [formData,setFormData] = useState({})
    console.log(formData)
    const navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState('')

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value})
    }

    const handleFocus = () => {
        setErrorMessage('')
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await fetch('/api/auth/signin',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success === true){
                signInSuccess(data.user)
                navigate('/')
            }
            if(data.success === false){
                return setErrorMessage(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-md w-full bg-white shadow-lg p-8'>
            <h1 className='text-center text-2xl font-semibold'>Sign in</h1>

            <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                    <Label>Username</Label>
                    <TextInput type='text' id='username' placeholder='Enter username' onFocus={handleFocus} onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <Label>Password</Label>
                    <TextInput type='password' id='password' placeholder='Enter password' onFocus={handleFocus} onChange={handleChange}/>
                </div>

                <div className='mt-4'>
                    <Button type='submit' className='w-full cursor-pointer'>Sign In</Button>
                </div>

                <div className='mt-4 flex gap-2'>
                    <p className='text-gray-500'>Don't have an account?</p>
                    <Link to='/signup'>
                        <span className='text-blue-500'>Sign up</span>
                    </Link>
                </div>

                <div className='mt-4'>
                    <p className='text-red-500'>{errorMessage}</p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signin