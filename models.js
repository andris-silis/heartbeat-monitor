var mongoose = require('mongoose');

var BaseSchema = new mongoose.Schema({
	val: Number,
    ts: Date
});
BaseSchema.index({ ts: 1 });


var HeartbeatSchema = BaseSchema;
var TemperatureSchema = BaseSchema;


module.exports = {
	Heartbeat: mongoose.model('Heartbeat', HeartbeatSchema),
	Temperature: mongoose.model('Temperature', TemperatureSchema)
};
