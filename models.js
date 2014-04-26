var mongoose = require('mongoose');

var Temperature = new mongoose.Schema({
	val: Number,
    ts: Date
});



module.exports = {
	Temperature: Temperature
};
