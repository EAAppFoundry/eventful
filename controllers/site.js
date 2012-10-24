
var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();



exports.index = function(req, res){
	res.render('index', {title: 'test'});
}

exports.save = function(req, res){
	var d = Date();

	EventProvider.createEvent(
		d,
		'1:00pm',
		'this is a test evnet',
		'Techwood',
		'Don Browning',
		'#test', 
		function(err){
			res.send('ok');
		});

}