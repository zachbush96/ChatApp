//const http = require('http').createServer();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080;


//Serve static HTML file
app.use(express.static("landing-page"));
app.get('/', (req,res) => {
  res.sendFile('index.html', {root:__dirname + '/landing-page'});
});


const server = app.listen(PORT, "Listening on port " + PORT);
//http.listen(process.env.PORT || 8080, () => console.log('Listening'));



//Import socketIO and setup CORS to get/send messages to and from any domain
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});


io.on('connection', (socket) => {
  console.log('A user connected!');
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', '${socket.id.substr(0,2)} said ${message}' );  
  });
});
