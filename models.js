var mongoose = require('mongoose');

var TemperatureSchema = new mongoose.Schema({
	val: Number,
    ts: Date
});
TemperatureSchema.index({ ts: 1 });


module.exports = {
	Temperature: mongoose.model('Temperature', TemperatureSchema)
};
