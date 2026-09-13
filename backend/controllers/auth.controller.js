import User from "../models/auth.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next) => {
    try {
        const {username,password} = req.body

        const existingUsername = await User.findOne({username})

        if(existingUsername){
            return next(errorHandler(400, 'Username is already exists'))
        }

        const hashedPassword = await bcryptjs.hash(password, 12)
    
        const newUser = new User({
            username,
            password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({
            success:true,
            message:'Sign up successful'
        })
    
    } catch (error) {
        next(error)
    }
}

export const signin = async (req,res,next) => {
    try {
        const{username,password} = req.body
        
        const validUser = await User.findOne({username})

        if(!validUser){
            return next(errorHandler(400, 'User not found'))
        }

        const validPassword = await bcryptjs.compare(password,validUser.password)

        if(!validPassword){
            return next(errorHandler(400, 'Incorrect password'))
        }

        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite:'lax',
            maxAge:24*60*60*1000
        })
        .status(200)
        .json({
            success:true,
            message:'Sign in successful'
        })
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req,res,next) => {
    try {
        const users = await User.find().select('-password')

        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req,res,next) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({
        success:true,
        message:'User is deleted'
    })
}

export const updateUser = async (req,res,next) => {
    try {
        const {username} = req.body

        const existingUsername = await User.findOne({
            username,
            _id: {$ne: req.params.userId}
        })

        if(existingUsername){
            return next(errorHandler(400, 'Username already exists'))
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:username
            }
        },{new:true}).select('-password')

        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}