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


	app.get('/', views.clientHtml);
	app.get('/-api/heartbeats', views.heartbeatData);
	app.listen(7076);



	var sendFakeHeartbeat = function () {
		setTimeout(function () {
			var level = parseInt(Math.random() * 200, 10);
			app.io.broadcast('heartbeat', level);
			console.log('heartbeat', level);
			sendFakeHeartbeat();
		},
		300);
	};
	sendFakeHeartbeat();

};


initApp();





