var models = require('./models');





// Gonna move to require.js later garage48


var clientHtml = function (req, res) {
	res.sendfile(__dirname + '/client.html');
};


var heartbeatData = function (req, res) {
	var limit = req.params.id || 36;

	models.Heartbeat.find().select('val ts').lean().limit(limit).sort('ts').exec(function (err, data) {
		if (err) {
			res.send(400);
			return;
		}

		res.send(data);
	});
};




module.exports = {
	clientHtml: clientHtml,
	heartbeatData: heartbeatData
}

