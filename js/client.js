
var heartbeatSeries = new TimeSeries();
function createTimeline() {
	var chart = new SmoothieChart({
		yRangeFunction: function () { return { min: 100, max: 1000 } }
	});
	chart.addTimeSeries(
		heartbeatSeries,
		{
			strokeStyle: 'rgba(0, 255, 0, 1)',
			lineWidth: 2
		}
	);
	chart.streamTo(document.getElementById("chart"), 3000);
}

var bpmSeries = new TimeSeries();
function createTimelineHeartrate() {
	var chart = new SmoothieChart({
		yRangeFunction: function () { return { min: 20, max: 180 } }
	});
	chart.addTimeSeries(
		bpmSeries,
		{
			strokeStyle: 'rgba(0, 255, 0, 1)',
			lineWidth: 2
		}
	);
	chart.streamTo(document.getElementById("chart-heartrate"), 3000);
}




$(function () {
	'use strict';
	var conn = io.connect();
	var firstTs;

	var appendHeartbeatData = function (data) {
		heartbeatSeries.append(data.ts, data.value);
	};
	appendHeartbeatData = _.throttle(appendHeartbeatData, 80);
	conn.on('heartbeat', appendHeartbeatData);

	conn.on('bpm', function (data) {
		var ts = data.ts;
		var bpm = data.value;

		bpmSeries.append(ts, bpm);

		var $bpm = $('#bpm span');

		if (bpm < 50 || bpm > 100) {
			$bpm.css({ background: 'red' });
		} else {
			$bpm.css({ background: 'none' });
		}

		$bpm.text(bpm);

		// beep(100);
	});

	createTimeline();
	createTimelineHeartrate();

	window.conn = conn;
});



