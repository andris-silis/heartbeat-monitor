var initApp = function () {
	'use strict';

	var express = require('express.io');
	var app = express();
	var path = require('path');
	app.http().io();

	console.log(path.join(__dirname, 'node_modules'));
	console.log(__dirname);

	app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
	app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
	app.use('/js', express.static(path.join(__dirname, 'js')));


	// Broadcast the new visitor event on ready route.
	app.io.route('ready', function (req) {
		req.io.broadcast('new visitor');
	});


	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/client.html');
	});

	app.listen(7076);




	var sendFakeHeartbeat = function () {
		setTimeout(function () {
			app.io.broadcast(
				'heartbeat',
				parseInt(Math.random() * 200, 10)
			);
			console.log('brot');
			sendFakeHeartbeat();
		},
		1000);
	};
	sendFakeHeartbeat();

};


initApp();





