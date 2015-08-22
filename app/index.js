module.exports = function(app) {
  require('./sockets/')(app);

  app.set('models', require('./models'));
};
