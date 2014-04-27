var io = require('socket.io-client');
var moment = require('moment');

var socket = io.connect('http://localhost:7076');


socket.on('disconnect', function () {
	console.log('disconnect');
});

var sendFakeHeartbeat = function () {
    setTimeout(function () {
        var ts = moment().valueOf(); // Unix timestamp in milliseconds
        var value = parseInt(Math.random() * 1000, 10);

        console.log('Sending heartbeat', ts, value);
		socket.emit('heartbeat', { ts: ts, value: value }, function(resp, data) {
			console.log('server sent resp code ' + resp);
		});

        sendFakeHeartbeat();
    },
    40);
};
sendFakeHeartbeat();


