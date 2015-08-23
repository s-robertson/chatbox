var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.test) {
    console.log('here');
    req.session.test += 1;
  }
  else {
    req.session.test = 1;
    console.log('here2');
  }

  req.session.save();

  res.render('index', {
    title: 'Express',
    test: req.session.test
  });
});

router.get('/chatbox', function(req, res, next) {
  var boxId = req.query.boxId;
  var models = req.app.get('models');

  var invalidId = function() {
    res.render('invalid_box');
  }

  if (boxId) {
    models.Chatbox.findById(boxId).then(function(chatbox) {
      if (chatbox) {
        res.render('chatbox', {
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

module.exports = router;
