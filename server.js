// server.js
// Copyright (c) PyrousNET 2014. All rights reserved.
//
// @author Ben Payne <trixtur@gmail.com>

PORT = 80;
var net = require('net'),
    server = net.createServer(handler);

server.listen(PORT, function() {
    console.log('server lisening on port', PORT);
});

function handler(socket) {
    socket.addListener("connect", function() {
        console.log("Connection from " + socket.remoteAddress);
        socket.on('data', function(data) {
            var command = data.toString().replace(/(\r\n|\n|\r)/gm,"");
            switch(command) {
                case "exit":
                case "quit":
                    socket.write('Saving your data...\n\r');
                    setTimeout(function() {
                        socket.end("Good Bye\n");
                    }, 2000);
                    break;
                default:
                    console.log(socket.remoteAddress + ": " + data);
            }
        });
    });
}
