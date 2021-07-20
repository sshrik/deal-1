const WebSocketRouter = require('../lib/WebSocketRouter');

// Client 예시는 현재 폴더의 clientTestFile 을 확인하세요!
const wsRouter = new WebSocketRouter();

wsRouter.use((req, res) => {
  // Format에 ID가 있는지 검사.
  if (!req.id) {
    res.type = wsRouter.constant.req_fail;
    res.serverMsg = 'Invalid Format for request - ID가 없습니다.';
    wsRouter.end(res, req.socket);
  } else {
    // 항상 ID와 Socket쌍을 Update
    wsRouter.addUser(req.id, req.socket);
  }
});

wsRouter.use((req, res) => {
  // post message 에 sendTo 검사
  if (req.protocol === 'post') {
    if (!req.sendTo) {
      res.type = wsRouter.constant.req_fail;
      res.serverMsg =
        'Invalid Format for request - POST에는 보낼 대상이 있어야 합니다.';
      res.sendTo = req.id;
      wsRouter.end(res);
    }
  }
});

wsRouter.open('/', (req, res, next) => {
  // ws 는 사용자 개개인의 web socekt, 따라서 username과 ws 묶음이 있어야 채팅이나 알람을 보낼 수 있다.
  res.serverMsg = 'Chatting Server connect success.';
  res.sendTo = req.id;
});

wsRouter.post('/', (req, res, next) => {
  res.serverMsg = 'Chat message arrive.';
  res.data = req.data;
  res.sendTo = req.sendTo;
});

module.exports = wsRouter;
