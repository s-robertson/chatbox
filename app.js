var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models'),
  http = require('http');

var app = express();
var server = http.createServer(app);

require('./config/express')(app, config, server);

db.sequelize
  .sync({force: true})
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
    });
  }).catch(function (e) {
    throw new Error(e);
  });
