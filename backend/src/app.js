import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
import StoryRoutes from './routes/StoryRoutes.js';
import MessageRoutes from './routes/MessageRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import PaymentRoutes from './routes/PaymentRoutes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, removeUser, getReceiverSocketId } from './utils/Scokets.js';
import { Message } from './models/MessageModel.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
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
app.use("/api/product", ProductRoutes);
app.use("/api/payment", PaymentRoutes)


io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('addUser',(userid)=>{
        addUser(userid,socket.id)
    })

    socket.on('sendMessage', async({ senderId, receiverId, text }) => {
        const user = getReceiverSocketId(receiverId);
        const newMessage= new Message({senderId,receiverId,text})
        await newMessage.save();
        if (user) {
          io.to(user).emit('getMessage', {
            senderId,
            text,
          });
        }
      });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id)
    });
});


export { app, server, io };