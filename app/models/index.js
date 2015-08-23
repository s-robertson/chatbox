var Sequelize = require('sequelize');
var config = require('../config/config');

var sequelize = new Sequelize(
  config.database.dbname,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: config.database.dialect
  }
);

// load models
var models = [
  'Chatbox',
  'Message',
  'User'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Message.belongsTo(m.Chatbox, {as: "chatbox"});
  m.User.belongsTo(m.Chatbox, {as: 'chatbox'});

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

module.exports.sequelize = sequelize;
