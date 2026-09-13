import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'

dotenv.config()
const app = express()
const port = process.env.port

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.mongodb)
.then(() => {console.log('Mongodb is connected')})
.catch((err) => {console.log(err)})

app.use('/api/auth', authRoute)

app.get('/api/backend', (req,res) => {
    res.send('Welcome to backend')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})