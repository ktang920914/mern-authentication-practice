import { Button, Label, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Home = () => {

    const [users,setUsers] = useState([])
    const [openDeleteModal,setOpenDeleteModal] = useState(false)
    const [userIdToDelete,setUserIdToDelete] = useState('')
    const [openUpdateModal,setOpenUpdateModal] = useState(false)
    const [userIdToUpdate,setUserIdToUpdate] = useState('')
    const [usernameToUpdate,setUsernameToUpdate] = useState('')
    const [errorMessage,setErrorMessage] = useState('')

    const fetchUsers = async () => {
        const res = await fetch('/api/auth/getUsers')
        const data = await res.json()
        if(res.ok){
            setUsers(data)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[])

    const handleFocus = () => {
        setErrorMessage('')
    }

    const handleUpdateModal = (user) => {
        setOpenUpdateModal(true)
        setUserIdToUpdate(user._id)
        setUsernameToUpdate(user.username)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/auth/update/${userIdToUpdate}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({username:usernameToUpdate})
            })
            const data = await res.json()
            if(res.ok){
                setUsers((prevUsers) => prevUsers.map((user) => user._id === userIdToUpdate ? data : user))
                setUserIdToUpdate('')
                setOpenUpdateModal(false)
                setErrorMessage('')
            }
            if(data.success === false){
               return setErrorMessage(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteModal = (userId) => {
        setOpenDeleteModal(true)
        setUserIdToDelete(userId)
    }

    const handleDelete = async () => {
        const res = await fetch(`/api/auth/delete/${userIdToDelete}`,{
            method:'DELETE',
        })
        const data = await res.json()
        if(data.success === true){
            setUsers((prevUsers) => prevUsers.filter((users) => users._id !== userIdToDelete))
            setOpenDeleteModal(false)
            setUserIdToDelete('')
        }
    }

  return (
    <div className='min-h-screen'>
        <div className='max-w-6xl mx-auto p-3'>
            <h1 className='text-2xl font-semibold'>Users List</h1>

            <div className="overflow-x-auto">
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                        <TableHeadCell>No</TableHeadCell>
                        <TableHeadCell>Date</TableHeadCell>
                        <TableHeadCell>Username</TableHeadCell>
                        <TableHeadCell>Password</TableHeadCell>
                        <TableHeadCell>Action</TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user,index) => (
                        <TableRow key={user._id}>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>
                                <div className='flex gap-2'>
                                <Button className='cursor-pointer'
                                onClick={() => {handleUpdateModal(user)}}>
                                    Update</Button>
                                <Button className='cursor-pointer' color='red'
                                onClick={() => {handleDeleteModal(user._id)}}>
                                    Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

        <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
            <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this user?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="red" onClick={handleDelete}>
                            Yes, I'm sure
                        </Button>
                        <Button color="alternative" onClick={() => setOpenDeleteModal(false)}>
                            No, cancel
                        </Button>
                        </div>
                    </div>
                </ModalBody>
      </Modal>

      <Modal show={openUpdateModal} size="md" popup onClose={() => setOpenUpdateModal(false)}>
        <ModalHeader />
            <ModalBody>
                <form onSubmit={handleUpdate}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label>Username</Label>
                                <TextInput id="username" value={usernameToUpdate} onChange={(e) => setUsernameToUpdate(e.target.value)}
                                placeholder='Enter username' onFocus={handleFocus} required/>
                            </div>
                            <div className='mt-4 flex gap-2'>
                                <Button className='w-full cursor-pointer' type='submit'>S U B M I T</Button>
                                <Button className='w-full cursor-pointer' color='gray' onClick={() => {
                                setOpenUpdateModal(false)
                                setUserIdToUpdate(null)
                                setUsernameToUpdate('')
                                }}>C A N C E L</Button>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='text-red-500'>{errorMessage}</p>
                        </div>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default Home