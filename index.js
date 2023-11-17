// const WebSocket = require('ws');
// const server = new WebSocket.Server({
//   port:6000
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

const WebSocket = require('ws');

const ws_server = new WebSocket.Server({ port: 81 });

ws_server.on('connection', function connection(ws) {
    console.log("A client connected");
    ws.on('message', function incoming(message) {
        ws.send('Hi, you sent me ' + message);
    });
});