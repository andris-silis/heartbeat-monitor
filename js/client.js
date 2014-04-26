
(function (io, SmoothieChart, TimeSeries) {

	'use strict';
	var conn = io.connect();

	// conn.emit('ready');

	var smoothie = new SmoothieChart();
	smoothie.streamTo(document.getElementById('mycanvas'));

	var line1 = new TimeSeries();
	line1.append(new Date().getTime(), Math.random());

	smoothie.addTimeSeries(
		line1,
		{ strokeStyle: 'rgb(0, 255, 0)', lineWidth: 2 }
	);

	conn.on('heartbeat', function (data) {
		// console.log(data);
		line1.append(new Date().getTime(), data);
	});

	window.conn = conn;

})(window.io, window.SmoothieChart, window.TimeSeries);

