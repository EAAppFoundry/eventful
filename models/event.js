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

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name, {server: {socketOptions: {keepAlive: 1}}});
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

EventProvider.prototype.getEventById = function(id, callback){
	Event.findOne({_id: id}, function(err, event){
		callback(null, event);
	});
};

EventProvider.prototype.createEvent = function(event, callback){
	var e = new Event();

  // Don:  the following isn't necessary, the incoming
  //       event is shaped correctly, but i wasn't sure
  //       how to cruft up a mongoose event.

	e.EventDate = event.EventDate;
	e.Time = event.Time;
	e.Name = event.Name;
	e.Description = event.Description;
	e.Location = event.Location;
	e.Organizer = event.Organizer;
	e.Hashtag = event.Hashtag;
	e.Private = event.Private;
	e.Tags = event.Tags;

	console.log(e);

	e.save(function(err, e){
		callback(err, e);
	});
};  


exports.EventProvider = EventProvider;
