const WebSocket = require('ws');
var cors = require('cors')
const server = new WebSocket.Server({
  port:80
});
cors()
let sockets = [];
server.on('connection', function(socket) {
  sockets.push(socket);
  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg) {
    msg+=''
    console.debug({msg})
    sockets.forEach(s => s.send(msg));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});

// import { WebSocketServer } from 'ws';
// let port = process.env.port | 5000
// // console.debug(`running at port ${port}`)
// const wss = new WebSocketServer({ port: port});
// console.log(process.env);
// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });