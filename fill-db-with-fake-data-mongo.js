var heartbeatCycleValues = [
	10,
	25,
	50,
	100,
	200,
	200,
	100,
	50,
	25,
	10
];



var currentDb = db.getMongo().getDB('heartbeat-monitor');


var days = 30;

var now = moment();
var time = moment().subtract('days', days);
var ms10 = moment.duration(100, 'ms');
var valCounter = 0;

while (true) {
	time.add(ms10);

	currentDb.temperatures.insert({
		ts: time.toDate(),
		val: heartbeatCycleValues[valCounter]
	});

	if (valCounter >= heartbeatCycleValues.length - 1) {
		valCounter = 0;
	} else {
		valCounter++;
	}

	if (time > now) {
		break;
	}
}


