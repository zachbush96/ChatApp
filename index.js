const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


//Serve static HTML file
app.use(express.static("landing-page"));
app.get('/', (req,res) => {
  res.sendFile('index.html', {root:__dirname + '/landing-page'});
});


io.on('connection', (socket) => {
  console.log('A user connected!');
  socket.broadcast.emit("THIS TEST MESSAGE NOT FROM A USER");
  socket.on('message', (msg) => {
    console.log("message: " + msg);
    io.emit('message', `${socket.id.substr(0,2)} said ${msg}` );  
  });
});

server.listen(process.env.PORT)

