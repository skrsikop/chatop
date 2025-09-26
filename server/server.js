import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import http from 'http'
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import {Server} from 'socket.io';


// express app 
const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
  cors: {origin: "*"}
})

// Srore online users
export const userSocketMap = {}; // userId: socketId

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId)

  if(userId) userSocketMap[userId] = socket.id;

  // emit online users to all connected users 
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User Disconnected", userId)
     delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
  
})

// middleware setup 
app.use(express.json({limit: "4mb"}))
app.use(cors());

app.use("/api/status", (req,res) => (
  res.send("Server is running")
));

// database 
await connectDB();

if(process.env.NODE_ENV !== "production"){
  // port 
const port = process.env.PORT || 5000;

// server 
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

}
// export server for vercel 
export default server;
// Routes 
app.use("/api/auth", userRouter)
app.use("/api/messages", messageRouter)