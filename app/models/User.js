var bcrypt = require('bcrypt');

var authenticateUser = function(chatboxId, username, password, callback) {
  var self = this;

  self.findOne({ where: { chatboxId: chatboxId, username: username} }).then(function(user) {
    if (user) {
      var err = null,
        authenticated = false;

      if (bcrypt.compareSync(password, user.password)) {
        authenticated = true;
      }
      else {
        err = 'Invalid username or password';
      }

      return callback(err, authenticated, user);
    }
    else {
      return callback('No user found', false, null);
    }
  });
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    accessLevel: {
      type: DataTypes.INTEGER,
    }
  },{
    indexes: [
      {
        fields: ['username']
      }
    ],
    classMethods: {
      authenticate: authenticateUser
    }
  });

  User.beforeCreate(function(user, options) {
    var salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    // Default access level to the lowest.
    if (!user.accessLevel) {
      user.accessLevel = 1;
    }
  });

  return User;
}

