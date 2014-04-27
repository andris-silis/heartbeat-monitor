var series = new TimeSeries();

function createTimeline() {
	var chart = new SmoothieChart();
	chart.addTimeSeries(
		series,
		{
			strokeStyle: 'rgba(0, 255, 0, 1)',
			lineWidth: 2
		}
	);
	chart.streamTo(document.getElementById("chart"), 3000);
}

(function (io) {
	'use strict';
	var conn = io.connect();
	var firstTs;

	var appendData = function (data) {
		series.append(data.ts, data.value);
	};
	appendData = _.throttle(appendData, 80);

	conn.on('heartbeat', appendData);

	conn.on('bpm', function (data) {
		var bpm = data.value;
		var $bpm = $('#bpm span');

		if (bpm < 50 || bpm > 100) {
			$bpm.css({ background: 'red' });
		} else {
			$bpm.css({ background: 'none' });
		}

		$bpm.text(bpm);
	});

	window.conn = conn;
})(window.io);
