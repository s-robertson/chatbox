var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Chatbox',
  });
});

require('./chatbox')(router);

module.exports = router;
