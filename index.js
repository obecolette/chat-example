var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  var options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('index.html', options);
});

io.on('connection', function(socket){
  console.log("new connection");
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function(socket){
    console.log("disconnect");
  })

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
