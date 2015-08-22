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

module.exports = router;
