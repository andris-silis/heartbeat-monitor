var io = require('socket.io-client');

var socket = io.connect('http://localhost:7076');


socket.on('disconnect', function () {
	console.log('disconnect');
});

var previous = 100;
var sendFakeHeartbeat = function () {
    setTimeout(function () {
        var level = previous + Math.random() * 10 - 5;
        if (level < 0) {
            level = 0;
        } else if (level > 200) {
            level = 200;
        }
        console.log('Sending heartbeat', level);
		socket.emit('heartbeat', level, function(resp, data) {
 		   console.log('server sent resp code ' + resp);
		});

        previous = level;
        sendFakeHeartbeat();
    },
    40);
};
sendFakeHeartbeat();
