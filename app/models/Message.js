module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    username: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
      length: 'long'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.Chatbox, {as: "chatbox"});
      }
    }
  });

  return Message;
}

