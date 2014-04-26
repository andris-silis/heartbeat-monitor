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
	clientHomepage: clientHomepage,
	clientRealtimeHtml: clientRealtimeHtml,
	clientHistoryHtml: clientHistoryHtml,
	heartbeatData: heartbeatData
}

