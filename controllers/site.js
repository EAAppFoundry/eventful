// ##site.js
// ####This is an example of a typical controller

// require in the necessary stuff
var user = require('.././models/user');
var db = require('.././mongo');
io = module.parent.parent.exports.io;

// new up an instance of the EventProvider, allowing us to manipulate
// the database
var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

// This function serves up the home page for the app.  To see
// how it matches a route, look in routes.js for the method call:
//  app.get('/', siteController.index);
exports.index = function(req, res){
	if(req.session.userID){
		db.findOne(req.session.userID, 'users', function foundUser(user){
			console.log('user?');
			console.log(user);
      res.render('index', {title: 'index', user:user});
	  });
	}
	else{
    res.render('index', {title: 'index', user:undefined});
	}
}

exports.test = function(req, res){
	res.render('test', {title: 'test'});
}

// render the signin view
exports.signin = function(req, res){
	res.render('signin', {title: 'signin', layout:'false', message:''});
}

// this post takes the user/pass posted by the signin form,
// calls the db, and redirects back to '/'
exports.signinPost = function(req, res){

	var username = req.body.username;
	var password = req.body.password;

  console.log(req.session);

	user.signin(username, password, function(response){
		if(response.status.code === 'OK'){
			  console.log('successful login ***********');
			  req.session.userID = response.data._id;
			  console.log('just set the session id: ' + req.session.userID);
			  res.redirect('/');
		}
		else{
			res.json(response);
		}
  });
}


// renders the signup view
exports.signup = function(req, res){
	res.render('signup', {title: 'signup', layout:'false'});
}

// returns 1000 events as JSON
exports.events = function(req, res){
	EventProvider.getEvents(0, 1000, function retrievedAllEvents(err, events){
		if(err){
			console.log('*** Exploded trying to retrieve top 1000 events!!!');
      		res.send(err);
		}
		else{
			res.send(events);
		}
	})
}

// returns all the events for the date provided as JSON
exports.eventsForDate = function(req, res){
	var date = Date.parse(req.params.date);
	console.log('here');
	EventProvider.getEventsForDate(date, function(err, events){
		if(err){
			console.log('***Bad shit happened getting by date***');
			res.send(err);
		} else {
			res.send(events);
		}
	});
}

// returns a given event as JSON
exports.eventID = function(req ,res){
	EventProvider.getEventById(req.params.id, function(err, event){
		if(err){
			console.log('***Damn, bad shit happened***');
			res.send(err);
		} else {
			res.send(event);
		}
	});
}


//
// TODO:  secure this api method!
//
exports.save = function(req, res){
	var event = req.body.event;
  EventProvider.createEvent(event, function(err, e){
    io.sockets.emit('event.added', e);
    res.send(e);
	});
}

// returns a set of events for a given date as JSON
exports.queryByDate = function(req, res){
	var d = Date.parse(req.body.date);
	EventProvider.getEventsForDate(d, function(err, events){
		res.send(events);
	})
}


