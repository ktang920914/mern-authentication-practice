import express from 'express'
import { deleteUser, getUsers, signin, signup, updateUser } from '../controllers/auth.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getUsers', verifyToken, getUsers)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.put('/update/:userId', verifyToken, updateUser)

export default router