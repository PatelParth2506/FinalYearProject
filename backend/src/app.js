import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
import StoryRoutes from './routes/StoryRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, removeUser } from './utils/Scokets.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin:"*",
        credentials: true
    }
});

app.use(cors({
    origin:'*',
    credentials: true
}));

app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/story", StoryRoutes);
app.use("/api/message", MessageRoutes);


io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('adduser',(userid)=>{
        addUser(userid,socket.id)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id)
    });
});


export { app, server, io };