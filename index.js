const WebSocket = require('ws');
const server = new WebSocket.Server({
  port:80,

});

let sockets = [];
server.on('connection', function(socket) {
  sockets.push(socket);
  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg) {
    msg+=''
    console.debug({msg})
    sockets.forEach(s => s.send(msg));
  });

  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});
