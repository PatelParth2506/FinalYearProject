import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.js'

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser())
app.use("/api/user",UserRoutes)

export { app }
