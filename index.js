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


var express = require('express')
var expressWs = require('express-ws')

var app = express()
expressWs(app)

app.ws('/echo', (ws, req) => {

    ws.on('connection', function (connection) {
        //...
    })

    ws.on('close', function () {
        //...
    })
})

app.use(express.static('public'))
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})