module.exports = function(sequelize, DataTypes) {
  var Chatbox = sequelize.define('chatbox', {
    name: {
      type: DataTypes.STRING
    },
  });

  return Chatbox;
}

