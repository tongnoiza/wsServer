import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log('test mcu '+data);
    wss.clients.forEach(function each(client) {
        client.send(data, { binary: isBinary });
    });
  });
});