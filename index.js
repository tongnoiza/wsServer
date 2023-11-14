
// const WebSocket = require('ws');
// const server = new WebSocket.Server({
//   port: 6000
// });

// let sockets = [];
// server.on('connection', function(socket) {
//   sockets.push(socket);

//   // When you receive a message, send that message to every socket.
//   socket.on('message', function(msg) {
//     sockets.forEach(s => s.send(msg));
//     console.log(msg+'');
//   });

//   // When a socket closes, or disconnects, remove it from the array.
//   socket.on('close', function() {
//     sockets = sockets.filter(s => s !== socket);
//   });
// });

const express = require('express');
const ws = require('ws');

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

