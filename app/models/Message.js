module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('message', {
    username: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
      length: 'long'
    }
  });

  return Message;
}

