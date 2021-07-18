const http = require('http');
const WebSocketServer = require('ws').Server;

function appendWebSocketServer(app) {
  // Express App을 받아서 같은 Port를 사용하는 WebSocektServer를 만듭니다.
  const expressServer = http.createServer();

  const wss = new WebSocketServer({
    server: expressServer,
  });

  expressServer.on('request', app);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      let sendData = { event: 'res', data: null };
      message = JSON.parse(message);
      switch (message.event) {
        case 'open':
          console.log('Received: %s', message.event);
          ws.send('Hello, there?');
          break;
        case 'req':
          sendData.data = message.data;
          ws.send(JSON.stringify(sendData));
          break;
        default:
          break;
      }
    });
  });

  return expressServer;
}

module.exports = appendWebSocketServer;
