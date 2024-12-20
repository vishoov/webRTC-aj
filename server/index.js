import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

const app = express();
const port = 3000;
// we create a server using the http module
const server = createServer(app); 
// http network provides foundation for our Socket.io server

//we create a server on top of the http server handshake
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"],
    }
});
//because we were not being able to connect through the api because of cors policy
app.use(cors({
    origin:"http://localhost:5173/",
    methods:["GET", "POST"],
}));

app.get("/", (req, res) => {
    res.send("Welcome to the chat application built by - AccioJob");
});

 io.use((socket, next)=>{
   next();
 })

//this is a socket function that establishes a live connection
io.on("connection", (socket)=>{
    console.log("a user has been connect", socket.id);
    
    socket.on("message", ({Room, message})=>{
        console.log({Room, message});
        // io.emit("recieve-message", data);
        socket.to(Room).emit("recieve-message", message);
    });

    socket.on("join-room", (RoomName)=>{
        socket.join(RoomName);//  this helps in joining a room//
        console.log(`user joined ${RoomName}`);
    });
    
    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
    })
})

//because we were getting not found error
//we make the http server on which the sockets are connect listen on port 3000
server.listen(port, ()=>{
    console.log(`server is live on port ${port}`)
});