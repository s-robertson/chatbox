var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/chatbox', function(req, res, next) {
  var boxId = req.query.boxId;

  var invalidId = function() {
    res.render('chatbox/invalid');
  }

  if (boxId) {
    db.Chatbox.findById(boxId).then(function(chatbox) {
      if (chatbox) {
        res.render('chatbox/index', {
          chatbox: chatbox
        });
      }
      else {
        return invalidId();
      }
    });
  }
  else {
    return invalidId();
  }
});
