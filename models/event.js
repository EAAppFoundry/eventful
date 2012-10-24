var mongoose = require('mongoose');
var config = require('../config');
var db = config.DatabaseConfig;

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Event = new Schema({
    EventDate         : Date,
    Time           	  : String,
    Description       : String,
    Location          : String,
    Organizer         : String,
    Hashtag           : String
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Event', Event, 'events');

var Event = mongoose.model('Event');

EventProvider = function(){};

EventProvider.prototype.getEvents = function(callback){

};

EventProvider.prototype.createEvent = function(date, time, description, location, org, hashtag, callback){
	var e = new Event();

	console.log(date);

	e.EventDate = date;
	e.Time = time;
	e.Description = description;
	e.Location = location;
	e.Organizer = org;
	e.Hashtag = hashtag;

	console.log(e);

	e.save(function(err, e){
		callback(err);
	});
};

exports.EventProvider = EventProvider;
