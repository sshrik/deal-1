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
    wsRouter.addUser(req.id, req.socket);
  }
});

wsRouter.open('/', (req, res, next) => {
  // ws 는 사용자 개개인의 web socekt, 따라서 username과 ws 묶음이 있어야 채팅이나 알람을 보낼 수 있다.
  res.serverMsg = 'Chatting Server connect success.';
  res.sendTo = req.id;
});

wsRouter.get('/', (req, res, next) => {
  if (!req.sendTo) {
    // console.log('message format need at least id / protocol / url / sendTo');
  }
  res.serverMsg = 'good';
  res.data = 'DATA FOR 23ADC-1230ADC-AS23GKIERT';
  res.sendTo = req.sendTo;
});

module.exports = wsRouter;
