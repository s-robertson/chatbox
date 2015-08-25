var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  root: rootPath,
  port: 3000,
  database: 'postgres://example:example@localhost/example',
  session: {
    secret: 'some secret key here',
    cookieName: 'cookie name here'
  }
};

module.exports = config;
