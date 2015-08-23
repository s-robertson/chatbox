(function($){
  var chatboxId = $('#chatbox').attr('data-chatboxid');
  window.socket = io('http://localhost:3000/chatbox', {query: 'chatboxId=' + chatboxId});

  var $loginForm = $('#login-form');
  var $messageBox = $('#message-box');

  // Login-related events
  $loginForm.submit(function() {
    var username = $loginForm.find('#username').val(),
      password = $loginForm.find('#password').val();

    socket.emit('chat login', username, password);
    return false;
  });

  socket.on('user connected', function(info) {
    if (!info.username) {
      $loginForm.show();
    }
    else {
      $messageBox.show();
    }
  })

  socket.on('chat authentication', function(err, authenticated) {
    if (authenticated) {
      $loginForm.hide();
      $messageBox.show();
    }
    else {
      alert(err);
    }
  });

  // Message-related events
  $('#message-form').submit(function(){
    socket.emit('chat message', $('#message').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

})(jQuery);
