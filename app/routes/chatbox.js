module.exports = function(router) {
  router.get('/chatbox', function(req, res, next) {
    var boxId = req.query.boxId;
    var models = req.app.get('models');

    var invalidId = function() {
      res.render('chatbox/invalid');
    }

    if (boxId) {
      models.Chatbox.findById(boxId).then(function(chatbox) {
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
};
