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

var last10 = [];

io.on('connection', (socket) => {
  console.log('A user connected!');
  io.emit("THIS TEST MESSAGE NOT FROM A USER");
  for (var item in last10){
    io.emit(item);
  }
  socket.on('message', (msg) => {
    last10.push(`${socket.id.substr(0,2)} said ${msg}`);
    console.log("Last 10: "+last10);
    console.log("message: " + msg);
    io.emit('message', `${socket.id.substr(0,2)} said ${msg}` );  
  });
});

server.listen(process.env.PORT)

