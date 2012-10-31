// ##event.js
// Example of using mongoose to access mongodb

var mongoose = require('mongoose');

// read in database config
var config = require('../config');
var db = config.DatabaseConfig;

// Create a new instance of the base mongoose schema
var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

// Define your model by extending mongoose.schema
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

// setup the mongodb connection
mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name, {server: {socketOptions: {keepAlive: 1}}});

// this wires up the modle and the collection in mongodb
mongoose.model('Event', Event, 'events');

// create an instance of the model for user later
var Event = mongoose.model('Event');

// Create a new provider instance
// Using the provider allows us to define a stateless object
// that will provide access to the Event model 
EventProvider = function(){};


// getEvents(skip, take, func) will return [take] number events
// starting with [skip] number
EventProvider.prototype.getEvents = function(skip, take, callback){
	var today = createTimelessDate();

	Event.find({EventDate: {$gte: today}}, null, {skip:skip, limit:take}, function(err, events){
		callback(null, events);
	});
};

// getEventsForDate(date, func) will return all events for a given date
EventProvider.prototype.getEventsForDate = function(date, callback){

	Event.find({EventDate:date}, function(err, events){
		callback(null, events);
	});
};

// getEventById(id, func) will return the detail of the event that matches
// the provided id
EventProvider.prototype.getEventById = function(id, callback){
	Event.findOne({_id: id}, function(err, event){
		callback(null, event);
	});
};

// queryEvents(query, func) will return events that satisfy the query
// the [query] object is a set of {key:value} passed directly to mongodb
EventProvider.prototype.queryEvents = function(query, callback) {
	Event.find(query, function(err, events){
		callback(null, events);
	});
};

// creatEvent(event) will create a new event..
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

// clear(func) drops the Events collection
EventProvider.prototype.clear = function(callback){
	Event.collection.drop(function(err){
		callback();
	})
}

// utility functiont that creates a date w/the time component 
// set to 00:00:00.  Good for date queries.
function createTimelessDate() {
	var today = new Date();
	var s = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
	var d = new Date(s);
	return d;
}

// export the provider so that anyone who requires() this module can access it
exports.EventProvider = EventProvider;
