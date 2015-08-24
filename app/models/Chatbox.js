module.exports = function(sequelize, DataTypes) {
  var Chatbox = sequelize.define('Chatbox', {
    name: {
      type: DataTypes.STRING
    },
  });

  return Chatbox;
}

