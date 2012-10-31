// ##sms.js
// ####Controller for the twilio stuff

// require and new up the EventProvider
var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

// this is a static wrapper that all sms messages sent to the
// twilio api need.
var responseHead = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>';
var responseTail = '</Sms></Response>';

// this method is invoked by twilio when a text is sent
// to our designated phone number 
exports.events = function(req, res){
	var from = req.body.From;
	var to = req.body.To;
	var body = req.body.Body.toLowerCase();

	var message = '';

	console.log('From ' + from);
	console.log('To ' + to);
	console.log('Body ' + body);

	// Doing this to create a date w/a time of 00:00:00
	var today = new Date();
	var s = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
	var d = new Date(s);

	// bascially just figure out what command was sent, and query the db accordingly
	switch(true) {
		case(body === 'events'):
			EventProvider.getEventsForDate(d, function(err, events){
				console.log(events);
				var response = formatResponse(body, events);
				res.send (createResponse(response));
			})
			
			break;
		
		case(body === 'cnn' || body === 'techwood' || body === 'twc' || body === 'ct'):
			EventProvider.queryEvents({EventDate:d, Location: body}, function(err, events){
				var response = formatResponse(body, events);
				res.send(createResponse(response));
			});
			break;

		default:
			res.send(helpString());
			break;
	}

	
	
}

function formatResponse(location, events){
	var message = '';

	if(events.length === 0) {
		message += 'There are no events at ' + location + ' today.';
	} else {
		if(location === 'events') {
			message += events.length + ' at all locations today\n';
		} else {
			message += events.length + ' event(s) at ' + location + ' today:\n';
		}
		
		for(var i = 0;i<events.length;i++) {
			message += events[i].Name + '\n';
		}
	}
	console.log('message ' + message);
	return message;
				
}

// this just tacks on the sms wrapper
function createResponse(message){
	return responseHead + message + responseTail;
}

// this is what's returned if an unrecognized command it send via sms
function helpString() {
	var message = "Valid commands are: 'events', 'cnn', 'techwood', and 'twc'";
	return createResponse(message);
}

// for testing.. ignore.
exports.index = function(req, res){
	res.render('twil');
}