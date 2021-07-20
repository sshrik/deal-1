const http = require('http');
const WebSocketServer = require('ws').Server;
const wsRouter = require('../routes/webSocket');

function appendWebSocketServer(app) {
  // Express App을 받아서 같은 Port를 사용하는 WebSocektServer를 만듭니다.
  const expressServer = http.createServer();

  const wss = new WebSocketServer({
    server: expressServer,
  });

  expressServer.on('request', app);

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // WebSocket 데이터를 주고 받을 때 JSON 형태를 사용한다.
      let parseMessage = JSON.parse(message);
      parseMessage.socket = ws;
      wsRouter.run(parseMessage);
    });
  });

  return expressServer;
}

module.exports = appendWebSocketServer;
