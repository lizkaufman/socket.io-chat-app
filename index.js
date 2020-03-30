const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//initialize new instance of socket.io by passing the http (HTTP server) object
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    console.log('message sent: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});
