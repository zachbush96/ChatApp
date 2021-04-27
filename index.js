const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: { origin: "*" } });


//Serve static HTML file
app.use(express.static("landing-page"));
app.get('/', (req,res) => {
  res.sendFile('index.html', {root:__dirname + '/landing-page'});
});

var AllMessages = [];   //Used to hold all previous messages send. *SHOULD* be changed to a DB so they dont dissapear when the service is restarted

//When User Connects -->
io.on('connection', (socket) => {
  console.log('A user connected!');
  
  //Whenever a new user connects, all the previous messages are sent back out. This *SHOULD* only occur to the newly connected user, not every user that is connected
  for (var x = 0; x < AllMessages.length; x++){
    //I think there is an alternative to 'io.emit' that would be more helpfull
    io.emit('message', AllMessages[x].user + " said: " + AllMessages[x].message);
  }
  //When user sends a 'msg' object --> {user:user,message:message}
  socket.on('message', (msg) => {
    AllMessages.push(msg);     //Save the Message
    console.log("msg user: "+ msg.user + " sent: " + msg.message);      //Log the User sending the message along with the message being sent
    io.emit('message', msg.user + " said: " + msg.message);     //emit the new message as a 'message'
  });
});

server.listen(process.env.PORT)

