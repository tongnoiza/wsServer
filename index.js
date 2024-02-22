
import express from "express";
import cors from "cors";
import WebSocket, { WebSocketServer } from 'ws';
let app = express();
app.use(cors());
import { createServer } from 'http';

function onSocketError(err) {
  console.error(err);
}
const server = createServer();
// const wss = new WebSocketServer({ port: 443 });
const wss = new WebSocketServer({ noServer: true });
wss.on('connection', function connection(ws, request, client) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client}`);
  });
});
server.on('upgrade', function upgrade(request, socket, head) {
  socket.on('error', onSocketError);

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });

});

server.listen(443);
// app.on("upgrade", (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {ws.u
//     wss.emit("connection", ws, request);
//   });
// });

// wss.on("connection", function connection(ws) {
//   console.log("เชื่อมต่อ");
//   ws.on("error", console.error);

//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         console.log("ข้อความ "+data);
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });
// });

