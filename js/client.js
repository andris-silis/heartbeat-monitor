
(function (io) {

	'use strict';
	var conn = io.connect();

	// conn.emit('ready');

	conn.on('heartbeat', function (data) {
		console.log(data);
	});

	window.conn = conn;

})(window.io);

