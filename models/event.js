var mongoose = require('mongoose');
var config = require('../config');
var db = config.DatabaseConfig;

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Event = new Schema({
    Name 			  : String,
    EventDate         : Date,
    Time           	  : String,
    Description       : String,
    Location          : String,
    Organizer         : String,
    Hashtag           : String,
    Private			  : Boolean,
    Tags			  : [String]
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Event', Event, 'events');

var Event = mongoose.model('Event');

EventProvider = function(){};


// TODO:  this method should pull events from TODAY's date forward, not
//        historical events (at least for v1)
EventProvider.prototype.getEvents = function(skip, take, callback){
	var today = Date();

	Event.find({EventDate: {$gte: today}}, null, {skip:skip, limit:take}, function(err, events){
		callback(null, events);
	});
};

EventProvider.prototype.getEventsForDate = function(date, callback){
	Event.find({EventDate:date}, function(err, events){
		callback(null, events);
	});
};

EventProvider.prototype.createEvent = function(date, time, name, description, location, 
												org, hashtag, private, tags, callback){
	var e = new Event();

	console.log(date);

	e.EventDate = date;
	e.Time = time;
	e.Name = name;
	e.Description = description;
	e.Location = location;
	e.Organizer = org;
	e.Hashtag = hashtag;
	e.Private = private;
	e.Tags = tags;

	console.log(e);

	e.save(function(err, e){
		callback(err);
	});
};

exports.EventProvider = EventProvider;
