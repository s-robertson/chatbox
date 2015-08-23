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

  m.Chatbox.sync({force: true}).then(function() {
    return m.Chatbox.create({
      name: 'Test Box'
    });
  });

  m.Message.sync({force: true});
  m.User.sync({force: true}).then(function() {
    return m.User.create({
      username: 'Scott',
      password: 'testing',
      email: 'srobertson203@gmail.com',
      chatboxId: 1
    });
  });

})(module.exports);

module.exports.sequelize = sequelize;
