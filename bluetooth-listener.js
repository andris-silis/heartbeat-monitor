var io = require('socket.io-client');

var socket = io.connect('http://localhost:7076');

socket.on('disconnect', function () {
	console.log('disconnect');
});


// console.log('Sending heartbeat', level);
// socket.emit('heartbeat', level, function(resp, data) {
// 	console.log('server sent resp code ' + resp);
// });



var serialport = require('serialport');
var serialPort = new serialport.SerialPort(
    "/dev/tty.RNBT-356E-RNI-SPP",
    {
        baudrate: 115200,
        parser: serialport.parsers.raw
    }
);

serialPort.open(function () {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log(data.toString());

    });
    serialPort.write("ls\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
});


