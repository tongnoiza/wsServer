import express from 'express'
let app = express();
import expressWs from 'express-ws'
import cors from 'cors'
app.use(cors())
expressWs(app);
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send("data "+msg)
  });
  console.log('socket', req.testing);
});

app.listen(443);