module.exports = function(app) {
  var io = app.io;
  var cookieParser = app.get('cookieParser');
  var config = require('../config/config');
  var sessionStore = app.get('sessionStore');

  io.use(function(socket, next) {
    var request = socket.request;

    cookieParser(request, {}, function(parseErr) {
      if(parseErr) { return next(new Error('Error parsing cookies.')); }

      var sidCookie = (request.secureCookies && request.secureCookies[config.session.cookieName]) ||
        (request.signedCookies && request.signedCookies[config.session.cookieName]) ||
        (request.cookies && request.cookies[config.session.cookieName]);

      sessionStore.load(sidCookie, function(err, session) {
        // And last, we check if the used has a valid session and if he is logged in
        if (err) {
          return next(err);
        } else {
          // If you want, you can attach the session to the handshake data, so you can use it again later
          // You can access it later with "socket.request.session" and "socket.request.sessionId"
          request.session = session;
          request.sessionId = sidCookie;

          return next();
        }
      });
    });
  });

  io.on('connection', function(socket){
    io.emit('user connected', 'test');
    console.log('herez');
    console.log(socket.request.session);

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
}
