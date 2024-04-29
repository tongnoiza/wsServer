import mosca from "mosca";
const setting = {
  port: 1883,
  http: {
    port: 8883,
  },
};
const server = mosca.Server(setting)
// server.on('ready',setup)
server.on('clientconnected',()=>{
  console.log('cliend connect');
})