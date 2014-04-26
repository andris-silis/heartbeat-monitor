


var clientHtml = function (req, res) {
	res.sendfile(__dirname + '/client.html');
};


module.exports = {
	clientHtml: clientHtml
}

