import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import { use } from 'react';
import { io } from 'socket.io-client';
//this would be responsible for connection client with the server



const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server", socket.id);
    });
  
    socket.on("message", (data) => {
      console.log(data);
    });

    return ()=>{
      socket.disconnect();
    }

  }, []);

  return (
    <Container>
      <Typography variant='h1' component="div" gutterBottom>
        Welcome to the chat application built by - AccioJob
      </Typography>

      <form onSubmit= {handleSubmit}>
        <TextField type="text" onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <Button type="submit" variant='contained' color="primary">Send</Button>
      </form>
    </Container>
  )
}

export default App