
import express from "express";
import cors from "cors";

import { WebSocketServer } from "ws";
let app = express();
app.use(cors());

const wss = new WebSocketServer({ port: 443 });
app.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
wss.on("connection", function connection(ws) {
  console.log("เชื่อมต่อ");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    ws.send("something " + data);
  });
});


