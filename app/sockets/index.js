module.exports = function(app) {
  var io = app.io;

  io.on('connection', function(socket){
    console.log('connecting?');

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
}
