import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes.js'
import PostRoutes from './routes/PostRoutes.js'
import { Comment } from './models/CommentModel.js';

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.static("public"))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieParser())

app.use("/api/user",UserRoutes)
app.use("/api/post",PostRoutes)

export { app }
