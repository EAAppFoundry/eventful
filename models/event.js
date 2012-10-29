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
    Tags			  : [String],
    PassbookURL	      : String
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name, {server: {socketOptions: {keepAlive: 1}}});
mongoose.model('Event', Event, 'events');

var Event = mongoose.model('Event');

EventProvider = function(){};


// TODO:  this method should pull events from TODAY's date forward, not
//        historical events (at least for v1)
EventProvider.prototype.getEvents = function(skip, take, callback){
	var today = createTimelessDate();

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

EventProvider.prototype.queryEvents = function(query, callback) {
	Event.find(query, function(err, events){
		callback(null, events);
	});
};


EventProvider.prototype.createEvent = function(event, callback){
	var e = new Event();

 	// todo: there has to be a better way to map a JSON object
 	// to a corresponding Mongoose model
	e.EventDate = event.EventDate;
	e.Time = event.Time;
	e.Name = event.Name;
	e.Description = event.Description;
	e.Location = event.Location.toLowerCase();
	e.Organizer = event.Organizer;
	e.Hashtag = event.Hashtag;
	e.Private = event.Private;
	e.Tags = event.Tags;
	e.PassbookURL = event.PassbookURL;

	console.log(e);

	e.save(function(err, e){
		callback(err, e);
	});
};  

EventProvider.prototype.clear = function(callback){
	Event.collection.drop(function(err){
		callback();
	})
}

function createTimelessDate() {
	// Doing this to create a date w/a time of 00:00:00
	var today = new Date();
	var s = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
	var d = new Date(s);
	return d;
}

exports.EventProvider = EventProvider;
