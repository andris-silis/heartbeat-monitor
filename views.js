var _ = require('lodash');
var moment = require('moment');
var models = require('./models');


// Gonna move to require.js later garage48

var clientHomepage = function (req, res) {
	res.sendfile(__dirname + '/clientHomepage.html');
};
var clientRealtimeHtml = function (req, res) {
	res.sendfile(__dirname + '/clientRealTime.html');
};
var clientHistoryHtml = function (req, res) {
	res.sendfile(__dirname + '/clientHistory.html');
};

var endpointBase = function (modelClass, req, res) {
	var fromTs, toTs;

	if (req.query.from_ts) {
		fromTs = moment.unix(req.query.from_ts).toDate();
	} else {
		fromTs = moment().subtract('minutes', 5).toDate();
	}

	if (req.query.to_ts) {
		toTs = moment.unix(req.query.to_ts).toDate();
	} else {
		toTs = moment().toDate();
	}


	modelClass
	.find()
	.where('ts').gt(fromTs).lt(toTs)
	.select('val ts')
	.lean()
	.sort('ts')
	.exec(function (err, data) {
		if (err) {
			res.send(400);
			return;
		}

		res.send(data);
	});
};

var heartbeatData = _.partial(endpointBase, models.Heartbeat);
var temperatureData = _.partial(endpointBase, models.Temperature);



var inputHeartbeat = function (req) {
	var level = req.data;
	console.log('Incoming heartbeat', level);
	req.io.broadcast('heartbeat', level);
};


var inputBPM = function (req) {
	var bpm = req.data;
	console.log('Incoming bpm', bpm);

	var bpm = new models.BPM({
		ts: new Date(),
		val: bpm
	});
	bpm.save();

	req.io.broadcast('bpm', bpm);
};


module.exports = {
	clientHomepage: clientHomepage,
	clientRealtimeHtml: clientRealtimeHtml,
	clientHistoryHtml: clientHistoryHtml,
	heartbeatData: heartbeatData,
	temperatureData: temperatureData,
	inputHeartbeat: inputHeartbeat,
	inputBPM: inputBPM
};
