(function($){
  var chatboxId = $('#chatbox').attr('data-chatboxid');
  window.socket = io('http://localhost:3000/chatbox', {query: 'chatboxId=' + chatboxId});

  var $loginBox = $('#login-box');
  var $messageBox = $('#message-box');

  // Login-related events
  $loginBox.submit(function() {
    var username = $loginBox.find('#username').val(),
      password = $loginBox.find('#password').val();

    socket.emit('chat login', username, password);
    return false;
  });

  socket.on('user connected', function(username) {
    if (username) {
      $messageBox.show();
    }
    else {
      $loginBox.show();
    }
  })

  socket.on('chat authentication', function(err, authenticated) {
    if (authenticated) {
      $loginBox.hide();
      $messageBox.show();
    }
    else {
      alert(err);
    }
  });

  // Message-related events
  $('#message-form').submit(function(e){
    var $messageInput = $('#message');
    socket.emit('chat message', $messageInput.val());
    $messageInput.val('');

    e.preventDefault();
  });

  socket.on('chat message', function(username, msg){
    $('#messages').append($('<div>').text(username + ': ' + msg));
  });

})(jQuery);
