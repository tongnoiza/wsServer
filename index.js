const express = require('express');
const ws = require('ws');

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
    console.log('connected ');
  socket.on('message', message =>{
    console.log(message+'');
    socket.send('message+ testconn ')
});

// socket.on()
})
// wsServer.on('message', sc =>{
//     console.log({sc});
// sc.send('test')
// })

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3005);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
// app.listen(3005);