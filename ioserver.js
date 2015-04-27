var app = require('express')();
var fs = require('fs');
var prompt = require('prompt');
prompt.start();

var server = app.listen(80);
var io = require('socket.io')(server);
var timer;
var reset;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/io.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { from_server: "hello world" });

  socket.on('my_other_event', function (data) {
    console.log(data);
    prompt.get(['input'], function(err, result) {
      socket.emit('news', {from_server:result.input});
    });
  });

  reset = function() {
    global.clearTimeout(timer);

    socket.on('final_event', function(data) {
      console.log(data);
      socket.emit("final_event", {server: 'Ok!'});
    });
  }();
});


