var models = require('./models');
var _ = require('lodash');


// Gonna move to require.js later garage48
var clientHtml = function (req, res) {
	res.sendfile(__dirname + '/client.html');
};


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
	clientHtml: clientHtml,
	heartbeatData: heartbeatData,
	temperatureData: temperatureData
};

