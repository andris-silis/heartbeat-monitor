var models = require('./models');
var _ = require('lodash');


// Gonna move to require.js later garage48

var clientHomepage = function (req, res) {
	res.sendfile(__dirname + '/clientHomepage.html');
};
var clientRealtimeHtml = function (req, res) {
	res.sendfile(__dirname + '/clientRealTime.html');
};
var clientHistoryHtml = function (req, res) {
	res.sendfile(__dirname + '/clientHistory.html');


var endpointBase = function (modelClass, req, res) {
	var limit = req.params.id || 36;

	modelClass.find().select('val ts').lean().limit(limit).sort('ts').exec(function (err, data) {
		if (err) {
			res.send(400);
			return;
		}

		res.send(data);
	});
};

var heartbeatData = _.partial(endpointBase, models.Heartbeat);
var temperatureData = _.partial(endpointBase, models.Temperature);

module.exports = {
	clientHomepage: clientHomepage,
	clientRealtimeHtml: clientRealtimeHtml,
	clientHistoryHtml: clientHistoryHtml,
	heartbeatData: heartbeatData,
	temperatureData: temperatureData
};