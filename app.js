var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const livereload = require('livereload');
const { bundle } = require('./webpack.config');

var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

var app = express();

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
app.use(express.static(path.join(__dirname, 'public/dist')));
app.use(express.static(path.join(__dirname, 'public/resource')));

app.use('/', indexRouter);
app.use(authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
