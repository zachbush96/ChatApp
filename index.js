const app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)


//Serve static HTML file
app.use(express.static("landing-page"));
app.get('/', (req,res) => {
  res.sendFile('index.html', {root:__dirname + '/landing-page'});
});

server.listen(process.env.PORT)

io.on('connection', (socket) => {
  console.log('A user connected!');
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', '${socket.id.substr(0,2)} said ${message}' );  
  });
});
