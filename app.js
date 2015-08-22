var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var socket_io = require('socket.io');

var routes = require('./app/routes/index');
var users = require('./app/routes/users');

var app = express();
var config = require('./app/config/config');

// Socket.io
var io = socket_io();
app.io = io;

// App
require('./app/')(app);
var sequelize = app.get('models').sequelize;

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// session setup

// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var cParser = cookieParser(config.session.secret);
app.set('cookieParser', cParser);
app.use(cookieParser());

var sess = {
  secret: config.session.secret,
  name: config.session.cookieName,
  cookie: { secure: false },
  saveUninitialized: true,
  resave: true
}

var sessionStore;

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies

  // Only use database for session in production setting.
  sessionStore = new SequelizeStore({
    db: sequelize
  });
}
else {
  sessionStore = new session.MemoryStore();
}

sess.store = sessionStore;
app.use(session(sess));
app.set('sessionStore', sessionStore);

app.use('/', routes);
app.use('/users', users);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

require('./app/sockets')(app);

module.exports = app;
