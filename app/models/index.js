var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};

var sequelize = new Sequelize(config.database);

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/*
 // describe relationships
 (function(m) {

 // Test Data
 m.Chatbox.sync({force: true}).then(function() {
 return m.Chatbox.bulkCreate([
 {
 name: 'Test Box'
 },
 {
 name: 'Test Box 2'
 }
 ]);
 });

 m.Message.sync({force: true});
 m.User.sync({force: true}).then(function() {
 return m.User.bulkCreate([
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

 })(module.exports);

 */
