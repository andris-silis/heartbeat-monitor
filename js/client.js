var container = $("#placeholder");
var maximum = parseInt(container.outerWidth() / 2) || 300;

function getInitialData() {

	var res = [];

    for (var i = maximum; i >= 0; i--) {
    	res[i] = [i, 100];
    };
    return res;
}

var datasets = [
	{
		data: getInitialData()
	}
];
var plot = $.plot("#placeholder", datasets, {
	series: {
		shadowSize: 0	// Drawing is faster without shadows
	},
	yaxis: {
		min: -900,
		max: 1500
	},
	xaxis: {
		show: false
	},
	grid: {
		borderWidth: 1,
		minBorderMargin: 20,
		labelMargin: 10,
		backgroundColor: {
			colors: ["#fff", "#e4f4f4"]
		},
		margin: {
			top: 8,
			bottom: 20,
			left: 20
		},
		markings: function(axes) {
			var markings = [];
			var xaxis = axes.xaxis;
			for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
				markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
			}
			return markings;
		}
	},
	legend: {
		show: true
	}
});

(function (io) {
	'use strict';
	var conn = io.connect();
	var firstTs;

	conn.on('heartbeat', function (data) {
		var ts = data.ts;
		var value = data.value;

		if (!firstTs) {
			firstTs = ts;
		}
		ts = ts - firstTs + maximum;


		// console.log('heartbeat', data);

		// if (counter++ % 2) {
		datasets[0].data.push([ts, value]);
		$.each(datasets, function(order) {
			if (datasets[order].data.length > maximum) {
				datasets[order].data.shift();
			}
		});

		plot.setupGrid();
		plot.setData(datasets);
		plot.draw();
	});

	conn.on('bpm', function (data) {
		$('#bpm').text(data.value);
	});

	window.conn = conn;
})(window.io);
