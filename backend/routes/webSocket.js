const WebSocketRouter = require('../lib/WebSocketRouter');

// Client 예시는 현재 폴더의 clientTestFile 을 확인하세요!
const wsRouter = new WebSocketRouter();

wsRouter.use((req, res) => {
  // DB에서 session ID를 검색하거나 할 수 있음. 혹은 express session을 사용 할 수 있는 형태로 현재 Router 를 업그레이드 해도 좋을듯!
  if (req.sessionID !== 'USERNAME') {
    // Session ID가 틀린 로직
    console.log('SESSION NOT ALLOWED!');
  }
});

wsRouter.use((req, res) => {
  // 예시용 middleware
  if (req.availableUser !== 'USERNAME') {
    // Session ID가 틀린 로직
    console.log('MIDDLEWARE #2');
  }
});

wsRouter.open('/', (req, res, next) => {
  // ws 는 사용자 개개인의 web socekt, 따라서 username과 ws 묶음이 있어야 채팅이나 알람을 보낼 수 있다.
  if (!req.id) {
    // console.log('message format need at least id / protocol / url');
  } else {
    wsRouter.addUser(req.id, req.socket);
  }
  res.serverMsg = 'good';
  res.userID = '23ADC-1230ADC-AS23GKIERT';
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
