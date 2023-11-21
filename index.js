// const WebSocket = require('ws');
// const server = new WebSocket.Server({
//   port:80,

// });

// let sockets = [];
// server.on('connection', function(socket) {
//   sockets.push(socket);
//   // When you receive a message, send that message to every socket.
//   socket.on('message', function(msg) {
//     msg+=''
//     console.debug({msg})
//     sockets.forEach(s => s.send(msg));
//   });

//   // When a socket closes, or disconnects, remove it from the array.
//   socket.on('close', function() {
//     sockets = sockets.filter(s => s !== socket);
//   });
// });

import { createServer } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';

const server = createServer();
const wss1 = new WebSocketServer({port:3009});


wss1.on('connection', function connection(ws) {
  ws.on('error', console.error);
    ws.on('message', function(msg) {
    msg+=''
    console.debug({msg})
    sockets.forEach(s => s.send(msg));
  });

  // ...
});


server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === '/') {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
    });
  }  else {
    socket.destroy();
  }
});

server.listen(80);