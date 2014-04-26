var container = $("#placeholder");
var maximum = parseInt(container.outerWidth() / 2) || 300;
var data = [];

function getInitialData() {
	return [];
};

var datasets = [
	{
		data: getInitialData()
	}
];
// var plot = $.plot("#placeholder", datasets, {
// 	series: {
// 		shadowSize: 0	// Drawing is faster without shadows
// 	},
// 	yaxis: {
// 		min: -1,
// 		max: 201
// 	},
// 	xaxis: {
// 		show: false
// 	},
// 	grid: {
// 		borderWidth: 1,
// 		minBorderMargin: 20,
// 		labelMargin: 10,
// 		backgroundColor: {
// 			colors: ["#fff", "#e4f4f4"]
// 		},
// 		margin: {
// 			top: 8,
// 			bottom: 20,
// 			left: 20
// 		},
// 		markings: function(axes) {
// 			var markings = [];
// 			var xaxis = axes.xaxis;
// 			for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
// 				markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "rgba(232, 232, 255, 0.2)" });
// 			}
// 			return markings;
// 		}
// 	},
// 	legend: {
// 		show: true
// 	}
// });