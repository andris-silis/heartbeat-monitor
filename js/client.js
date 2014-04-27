var series = new TimeSeries();

function createTimeline() {
	var chart = new SmoothieChart();
	chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
	chart.streamTo(document.getElementById("chart"), 50);
}

(function (io) {
	'use strict';
	var conn = io.connect();
	var firstTs;

	conn.on('heartbeat', function (data) {
		series.append(data.ts, data.val);
	});

	conn.on('bpm', function (data) {
		$('#bpm').text(data.value);
	});

	window.conn = conn;
})(window.io);
