
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

// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 5000 });

// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

const WebSocket = require('ws');

// Create a new WebSocket server
const server = new WebSocket.Server({ noServer: true });


server.on('upgrade', function (request, socket, head) {
    socket.on('error', onSocketError);
  
    console.log('Parsing session from request...');
  
    sessionParser(request, {}, () => {
      if (!request.session.userId) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
  
      console.log('Session is parsed!');
  
      socket.removeListener('error', onSocketError);
  
      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
      });
    });
  });

// Listen for connection events
server.on('connection', function(socket) {
  // Handle incoming messages from the client
  socket.on('message', function(msg) {
    // Log the message to the console
    console.log('Received: ' + msg);
    // Echo the message back to the client
    socket.send('Echo: ' + msg);
  });
  // Send a welcome message to the client
  socket.send('Hello, WebSocket!');
});