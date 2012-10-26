var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

var responseHead = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>';
var responseTail = '</Sms></Response>';


exports.events = function(req, res){
	var from = req.body.From;
	var to = req.body.To;
	var body = req.body.Body.toLowerCase();

	var message = '';

	console.log('From ' + from);
	console.log('To ' + to);
	console.log('Body ' + body);

	switch(true) {
		case(body === 'events'):
			var d = new Date('10-27-2012');
			EventProvider.getEventsForDate(d, function(err, events){
				message += 'Found ' + events.length + ' events: \n';
				for(var i = 0;i<events.length;i++) {
					message += events[i].Name + '\n';
				}
				console.log('message ' + message);
				res.send (message);
			})
			
			break;
		
		case(body === 'cnn'):
			console.log('query based on cnn');
			break;
		
		case(body === 'techwood'):
			console.log('find techwood events');
			break;
		case(body === 'twc'):
			break;
		default:
			res.send(helpString());
			break;
	}

	
	
}

function createResponse(message){
	return responseHead + message + responseTail;
}

function helpString() {
	var message = "Valid commands are: 'events', 'cnn', 'techwood', and 'twc'";
	return createResponse(message);
}

exports.index = function(req, res){
	res.render('twil');
}