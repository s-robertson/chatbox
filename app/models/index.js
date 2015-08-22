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
  'Message'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Message.belongsTo(m.Chatbox);

  m.Chatbox.sync({force: true}).then(function() {
    return m.Chatbox.create({
      name: 'Test Box'
    });
  });

  m.Message.sync({force: true});

})(module.exports);

module.exports.sequelize = sequelize;
