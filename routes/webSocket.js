class WebSocketRouter {
  constructor() {
    this.routeCallbackInfo = {
      open: {
        dest: [],
        callback: [],
      },
      get: {
        dest: [],
        callback: [],
      },
      post: {
        dest: [],
        callback: [],
      },
      update: {
        dest: [],
        callback: [],
      },
      delete: {
        dest: [],
        callback: [],
      },
    };
    this.middlewareStack = [];

    this.sendData = {
      type: 'req_success',
      serverMsg: '',
      data: '',
    };
    this.constant = {
      req_success: 'req_success',
      req_fail: 'req_fail',
    };
    this.userList = {
      id: [],
      ws: [],
    };
    this.set = this.set.bind(this);
    this.onNoDestForProtocol = this.set.bind(this);
    this.use = this.use.bind(this);
  }

  addUser(id, ws) {
    const index = this.getIdIndex(id);
    if (!index) {
      this.userList.id.push(id);
      this.userList.ws.push(ws);
    } else {
      this.userList.ws[index] = ws;
    }
  }

  removeUser(id) {
    const index = this.getIdIndex(id);
    if (index) {
      this.userList.id.splice(index, 1);
      this.userList.ws.splice(index, 1);
    }
  }

  getIdIndex(id) {
    for (let i = 0; i < this.userList.id.length; i++) {
      if (this.userList.id[i] === id) return i;
    }
    return false;
  }

  getWsWithId(id) {
    const index = this.getIdIndex(id);
    if (!index) {
      return this.userList.ws[index];
    } else {
      throw new Error('ID Do not match with anyone in list.');
    }
  }

  set(key, value) {
    this.sendData[key] = value;
  }

  use(middleware) {
    this.middlewareStack.push(middleware);
  }

  // express router 처럼 open, get, post, delete, update protocol type에 대해 등록.
  connectToRouteCallback(type, parseURL, callback) {
    this.routeCallbackInfo[type].dest.push(parseURL);
    this.routeCallbackInfo[type].callback.push(callback);
  }

  open(parseURL, callback) {
    this.connectToRouteCallback('open', parseURL, callback);
  }

  get(parseURL, callback) {
    this.connectToRouteCallback('get', parseURL, callback);
  }

  post(parseURL, callback) {
    this.connectToRouteCallback('post', parseURL, callback);
  }

  delete(parseURL, callback) {
    this.connectToRouteCallback('delete', parseURL, callback);
  }

  update(parseURL, callback) {
    this.connectToRouteCallback('update', parseURL, callback);
  }

  connect(parseURL, message, callback) {
    const protocol = message.protocol;
    switch (protocol) {
      case 'open':
        this.open(parseURL, callback);
        break;
      case 'get':
        this.get(parseURL, callback);
        break;
      case 'post':
        this.post(parseURL, callback);
        break;
      case 'delete':
        this.delete(parseURL, callback);
        break;
      case 'update':
        this.update(parseURL, callback);
        break;
      default:
        throw new Error('Invalid Type for router!');
    }
  }

  onDestNotFound(req, res, next) {
    this.set('type', this.constant.req_fail);
    this.set('serverMsg', 'Invalid URL for server.');
  }

  runProtocol(protocol, dest) {
    for (let i = 0; i < this.routeCallbackInfo[protocol].dest.length; i++) {
      if (this.routeCallbackInfo[protocol].dest[i] === dest) {
        return this.routeCallbackInfo[protocol].callback[i];
      }
    }
    return this.onDestNotFound;
  }

  run(req, callback) {
    // MiddleWare를 모두 수행하여 sendData의 데이터 가공
    this.middlewareStack.forEach((middleware) => {
      // req, res 의 middleware 형태.
      middleware(req, this.sendData);
    });

    let registeredFunction = this.onNoDestForProtocol;
    switch (req.protocol) {
      case 'open':
        registeredFunction = this.runProtocol('open', req.url);
        registeredFunction(req, this.sendData, callback);
        break;
      case 'get':
        registeredFunction = this.runProtocol('get', req.url);
        registeredFunction(req, this.sendData, callback);
        break;
      case 'post':
        registeredFunction = this.runProtocol('post', req.url);
        registeredFunction(req, this.sendData, callback);
        break;
      case 'delete':
        registeredFunction = this.runProtocol('delete', req.url);
        registeredFunction(req, this.sendData, callback);
        break;
      case 'update':
        registeredFunction = this.runProtocol('update', req.url);
        registeredFunction(req, this.sendData, callback);
        break;
      default:
        this.set('type', this.constant.req_fail);
        this.set('serverMsg', 'Invalid Type Error!');
        break;
    }
    this.end(req.id);
  }

  end(id) {
    const destWs = this.getWsWithId(id);
    destWs.send(JSON.stringify(this.sendData));
  }
}

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
});

wsRouter.get('/', (req, res, next) => {
  // console.log(req);
  res.serverMsg = 'good';
  res.data = 'DATA FOR 23ADC-1230ADC-AS23GKIERT';
});

module.exports = wsRouter;
