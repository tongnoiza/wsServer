import { WebSocketServer } from 'ws';
import  Express  from 'express';
import cors from 'cors'
const app = Express()

const wss = new WebSocketServer({ port: 443 });
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
