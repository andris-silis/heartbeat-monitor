var models = require('./models');





// Gonna move to require.js later garage48


var clientHtml = function (req, res) {
	res.sendfile(__dirname + '/client.html');
};


var heartbeatData = function (req, res) {
	models.Temperature.find(function (err, data) {
		if (err) {
			res.send(400);
			return;
		}

		res.send(data);
	});
}




module.exports = {
	clientHtml: clientHtml,
	heartbeatData: heartbeatData
}

