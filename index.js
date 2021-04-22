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
  //io.emit('message', "WELCOME!");
  for (var x = 0; x < last10.length; x++){
    io.emit('message', last10[x]);
  }
  socket.on('message', (msg) => {
    //last10.push(`${socket.id.substr(0,2)} said ${msg}`);
    console.log("Last 10: "+last10);
    console.log("message: " + msg);
    console.log("msg object: "+msg);
    console.log("msg user: "+ msg.user);
    console.log("msg text: " + msg.message);
    //io.emit('message', `${socket.id.substr(0,2)} said: ${msg}` );
    io.emit('message', msg.user + " said: " + msg.message);
  });
});

server.listen(process.env.PORT)

