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

    this.constant = {
      req_success: 'req_success',
      req_fail: 'req_fail',
    };
    this.userList = {
      id: [],
      ws: [],
    };

    this.onDestNotFound = this.onDestNotFound.bind(this);
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

  onDestNotFound(req, res) {
    res.type = this.constant.req_fail;
    res.serverMsg = 'Invalid URL for server.';
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
    const res = {
      type: 'req_success',
      serverMsg: '',
      data: '',
    };
    this.middlewareStack.forEach((middleware) => {
      // req, res 의 middleware 형태.
      if (!res.sendFlag) {
        middleware(req, res);
      }
    });

    if (res.sendFlag) return;

    let registeredFunction = this.onNoDestForProtocol;
    switch (req.protocol) {
      case 'open':
        registeredFunction = this.runProtocol('open', req.url);
        registeredFunction(req, res, callback);
        break;
      case 'get':
        registeredFunction = this.runProtocol('get', req.url);
        registeredFunction(req, res, callback);
        break;
      case 'post':
        registeredFunction = this.runProtocol('post', req.url);
        registeredFunction(req, res, callback);
        break;
      case 'delete':
        registeredFunction = this.runProtocol('delete', req.url);
        registeredFunction(req, res, callback);
        break;
      case 'update':
        registeredFunction = this.runProtocol('update', req.url);
        registeredFunction(req, res, callback);
        break;
      default:
        this.set('type', this.constant.req_fail);
        this.set('serverMsg', 'Invalid Type Error!');
        break;
    }
    this.end(res);
  }

  end(res, ws = null) {
    if (ws) {
      ws.send(JSON.stringify(res));
    } else {
      const destWs = this.getWsWithId(res.sendTo);
      destWs.send(JSON.stringify(res));
    }
    res.sendFlag = true;
  }
}

module.exports = WebSocketRouter;
