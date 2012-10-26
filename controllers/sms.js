var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

var responseHead = '<?xml version="1.0" encoding="UTF-8"?><Response><Sms>';
var responseTail = '</Sms></Response>';


exports.events = function(req, res){
	console.log('From ' + req.body.From);
	console.log('To ' + req.body.To);
	console.log('Body ' + req.body.Body);

	res.send('ok');
	
}

function createResponse(message){
	return responseHead + message + responseTail;
}



exports.index = function(req, res){
	res.render('twil');
}