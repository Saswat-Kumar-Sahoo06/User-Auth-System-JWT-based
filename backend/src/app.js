import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({
    limit:'16kb',
    extended: true
}))

//import routes
import UserRouter from './routes/user.route.js'

//using routes
app.use('/api/v1/user', UserRouter)

export {app}