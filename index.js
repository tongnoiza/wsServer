import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });


wss.on('connection', function connection(ws,req) {
  const ip = req.socket.remoteAddress;
  console.log({ip});
  ws.on('error', console.error);
console.log(wss.listenerCount());
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("tt "+data);
        client.send(data, { binary: isBinary });
      }
    });
  });
});
