// const express = require("express");
// const ws = require("ws");
// const app = express();

// const wsServer = new ws.Server({noServer:true});
// wsServer.on("connection", (socket) => {
//   console.log("connected ");

//   socket.on("message",(message) => {
//     console.log(message +'');
//     for (let i = 0; i <3; i++) {
//       socket.send("okk")
//     }
//   });
// })
// const server = app.listen(6000);
// server.on("upgrade", (request, socket, head) => {
//   wsServer.handleUpgrade(request, socket, head, (socket) => {
//     wsServer.emit("connection", socket, request);
//   });
// });

const WebSocket = require('ws');
const server = new WebSocket.Server({
  port:6000
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

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});


