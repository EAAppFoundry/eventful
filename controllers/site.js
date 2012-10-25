
var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

exports.index = function(req, res){
	res.render('index', {title: 'index'});
}

exports.test = function(req, res){
	res.render('test', {title: 'test'});
}

exports.save = function(req, res){
	var formDate = req.body.date;
	var d = Date.parse(formDate);

	var formTags = req.body.tags;
	var tags = formTags.split(',');

	console.log(req.body.private);

	EventProvider.createEvent(
		d,
		req.body.time,
		req.body.name,
		req.body.description,
		req.body.location,
		req.body.organizer,
		req.body.hashtag, 
		(req.body.private === 'on'),
		tags,
		function(err){
			res.send('ok');
		});

}