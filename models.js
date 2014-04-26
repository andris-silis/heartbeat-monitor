var mongoose = require('mongoose');

var TemperatureSchema = new mongoose.Schema({
	val: Number,
    ts: Date
});



module.exports = {
	Temperature: mongoose.model('Temperature', TemperatureSchema)
};
