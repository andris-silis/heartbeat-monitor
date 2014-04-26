var mongoose = require('mongoose');

var HeartbeatSchema = new mongoose.Schema({
	val: Number,
    ts: Date
});
HeartbeatSchema.index({ ts: 1 });


module.exports = {
	Heartbeat: mongoose.model('Heartbeat', HeartbeatSchema)
};
