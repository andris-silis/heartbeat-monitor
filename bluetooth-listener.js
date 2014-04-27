var io = require('socket.io-client');

var socket = io.connect('http://localhost:7076');

socket.on('disconnect', function () {
	console.log('disconnect');
});





var serialport = require('serialport');
var serialPort = new serialport.SerialPort(
    "/dev/tty.RNBT-356E-RNI-SPP",
    {
        baudrate: 115200,
        parser: serialport.parsers.readline("\n")
    }
);

serialPort.open(function () {
	var re = /(S|Q|B)([0-9]*)/;

    console.log('open');
    serialPort.on('data', function(data) {
		var res = data.match(re);

		if (!res) {
			return;
		}

		var type = res[1];
		var value = res[2];

        console.log(type, value);

    	if (type == 'S') {
			console.log('Sending heartbeat', value);
			socket.emit('heartbeat', value, function(resp, data) {
				console.log('server sent resp code ' + resp);
			});
    	} else if (type == 'B') {
			console.log('Sending BPM', value);
			socket.emit('bpm', value, function(resp, data) {
				console.log('server sent resp code ' + resp);
			});
    	}
    });
});


