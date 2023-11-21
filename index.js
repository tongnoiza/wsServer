const WebSocket = require('ws');
const port = process.env.port | 3001
const server = new WebSocket.Server({
  port:port,
});
console.log(`running at ${port}`);
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
