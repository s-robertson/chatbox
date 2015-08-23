module.exports = function(app) {
  var io = app.io;
  var cookieParser = app.get('cookieParser');
  var config = require('../config/config');
  var sessionStore = app.get('sessionStore');

  var chatboxIo = io.of('/chatbox');

  // Middleware to supply the session to socket events.
  chatboxIo.use(function(socket, next) {
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

  chatboxIo.on('connection', function(socket){
    var chatboxId = socket.handshake.query.chatboxId;

    if (chatboxId) {
      socket.join(chatboxId);
      var models = app.get('models');
      var session = socket.request.session || {};
      var username = null;

      if (!session.chatBoxes) {
        session.chatBoxes = [];
      }

      if (session.chatBoxes[chatboxId]) {
        username = session.chatBoxes[chatboxId].user.username;
      }

      if (username) {
        chatboxIo.to(chatboxId).emit('user joined', username);
      }

      socket.on('chat login', function(username, password) {
        models.User.authenticate(chatboxId, username, password, function(err, authenticated, user) {
          if (authenticated) {
            session.chatBoxes[chatboxId] = {
              user: user
            };

            session.save();
          }

          socket.emit('chat authentication', err, authenticated);
        });
      });

      socket.on('set username', function(username) {
        console.log('saving username:' + username);
        session.username = username;
        session.save();

        chatboxIo.to(chatboxId).emit('user joined', username);
      });

      socket.on('chat message', function(msg){
        chatboxIo.to(chatboxId).emit('chat message', msg);
      });
    }
  });
}
