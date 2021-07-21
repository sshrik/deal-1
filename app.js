const createError = require('http-errors');
const express = require('express');
const appendWebSocketServer = require('./backend/lib/webSocketApp');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const livereload = require('livereload');
const { bundle } = require('./webpack.config');

const authMw = require('./backend/middleware/auth');

const indexRouter = require('./backend/routes/index');
const profileRouter = require('./backend/routes/profile');
const authRouter = require('./backend/routes/auth');
const nonAuthRouter = require('./backend/routes/nonAuth');
const categoryRouter = require('./backend/routes/categories');
const productRouter = require('./backend/routes/products');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'dev') {
  const liveServer = livereload.createServer({
    exts: ['js', 'html', 'css'],
  });

  app.locals.env = process.env;

  bundle().then(() => {
    liveServer.watch([path.resolve('public/dist'), path.resolve('views')]);
    liveServer.server.once('connection', () => {
      setTimeout(() => {
        liveServer.refresh('/');
      }, 100);
    });
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  })
);
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(express.static(path.join(__dirname, 'public/resource')));

// index.html을 위한 routing
app.use('/', indexRouter);

// SESSION을 위한 Middleware.
app.use('/api/auth', authMw.checkSession); // 인증이 필요한 페이지에 대한 요청
app.use('/api/login', authMw.addSession); // 로그인은 session을 추가
app.use('/api/logout', authMw.removeSession); // 로그아웃은 session을 추가하지 않음.

// API 요청을 위한 Router
app.use('/api', profileRouter);
app.use('/api', categoryRouter);
app.use('/api', nonAuthRouter);
app.use('/api/auth', productRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const expressServer = appendWebSocketServer(app);

module.exports = { app: expressServer };
