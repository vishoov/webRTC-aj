import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { use } from 'react';
import { io } from 'socket.io-client';
//this would be responsible for connection client with the server



const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [Room, setRoom] = useState("");
  const [socketID, setsocketID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, Room});
    setMessage("");
  }


  useEffect(() => {
    socket.on("connect", () => {
      setsocketID(socket.id);
      console.log("connected to server", socket.id);
    });
  
    socket.on("recieve-message", (message) => {
      console.log(message);
    });

    return ()=>{
      socket.disconnect();
    }

  }, []);

  return (
    <Container>

      <Typography variant='h5' component="div" gutterBottom>
        Welcome to the chat app by - AccioJob
      </Typography>
      <Typography variant='h5' component="div" gutterBottom>
        {socketID}
      </Typography>


      <form onSubmit={handleSubmit}>
        <TextField type="text" onChange={(e)=>setMessage(e.target.value)} value={message} label="Message" variant='outlined'/>
        <TextField type="text" onChange={(e)=>setRoom(e.target.value)} value={Room} label="room" variant='outlined'/>
        
        <Button type="submit" variant='contained' color="primary">Send</Button>
      </form>
    </Container>
  )
}

export default App