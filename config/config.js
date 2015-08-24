var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  root: rootPath,
  port: 3000,
  database: 'postgres://chatbox:chatbox@localhost/chatbox',
  session: {
    secret: 'MGuQ7hjUypGXXOGl2cjYFPl4K1VNK6gBFhUCT4AF',
    cookieName: 'connect.sid'
  }
};

module.exports = config;
