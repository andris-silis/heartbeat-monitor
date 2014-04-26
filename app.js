var initApp = function () {
	'use strict';

	var express = require('express.io');
	var app = express();
	var path = require('path');
	var views = require('./views');

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/heartbeat-monitor');

	app.http().io();

	console.log(path.join(__dirname, 'node_modules'));
	console.log(__dirname);

	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
	app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
	app.use('/js', express.static(path.join(__dirname, 'js')));


	app.get('/', views.clientHomepage);
	app.get('/realtime', views.clientRealtimeHtml);
	app.get('/history', views.clientHistoryHtml);
	app.get('/-api/heartbeats', views.heartbeatData);
	app.get('/-api/temperature', views.temperatureData);
	app.listen(7076);


	var previous = 100;
	var sendFakeHeartbeat = function () {
		setTimeout(function () {
			var level = previous + Math.random() * 10 - 5;
			if (level < 0) {
				level = 0;
			} else if (level > 200) {
				level = 200;
			}
			app.io.broadcast('heartbeat', level);
			console.log('heartbeat', level);
			previous = level;
			sendFakeHeartbeat();
		},
		40);
	};
	sendFakeHeartbeat();

};


initApp();
