const express = require("express");
const ws = require("ws");

const app = express();

// Set up a headless websocket server that prints any
// events that come in.
app.get('/ws',(req,res)=>{
const wsServer = new ws.Server({noServer:true});
  // console.log(wsServer);/
wsServer.on("connection", (socket) => {
  console.log("connected ");

  socket.on("message",(message) => {
    console.log(message +'');
    for (let i = 0; i <10; i++) {
      socket.send("message+ testconn ");
    }
  });
})

res.sendStatus(200).end()
  // socket.on()
});
// wsServer.on('message', sc =>{
//     console.log({sc});
// sc.send('test')
// })

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(6000);
server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
// app.listen(3005);
