const express = require('express');
const app = express();
const cors = require('cors');
// Serve static files from 'public' folder
app.use(express.static('public'));
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow this origin
  methods: ['GET', 'POST']
}));
const expresserver=app.listen(3000);
const socketio=require('socket.io')
const io=socketio(expresserver,{
cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
})
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('welcome', (user) => {
    console.log(`${user} joined the chat`);
  });

  socket.on('msg', (data) => {
    console.log(`Message from ${data.user}: ${data.message}`);
    io.emit('msg', data); // Broadcast to all clients
  });
      socket.on('disconnect',()=>{console.log("user disconnected")})
});

