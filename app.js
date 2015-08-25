var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models'),
  http = require('http');

var app = express();

require('./config/express')(app, config);

db.sequelize
  .sync({force: true})
  .then(function () {
    // Dummy data
    db.Chatbox.bulkCreate([
      {
        name: 'Test Box'
      },
      {
        name: 'Test Box 2'
      }
    ]).then(function() {
      db.User.bulkCreate([
        {
          username: 'user1',
          password: 'testing',
          email: 'test1@test.com',
          chatboxId: 1
        },
        {
          username: 'user2',
          password: 'testing',
          email: 'test2@test.com',
          chatboxId: 1
        },
        {
          username: 'user3',
          password: 'testing',
          email: 'test2@test.com',
          chatboxId: 2
        },
        {
          username: 'user4',
          password: 'testing',
          email: 'test2@test.com',
          chatboxId: 2
        }
      ]);
    });

    var server = http.createServer(app);
    var io = require('socket.io').listen(server);

    server.listen(config.port, function(){
      console.log('Express server listening on port ' + config.port);
    });

    require('./app/sockets')(app, io);

  }).catch(function (e) {
    throw new Error(e);
  });
