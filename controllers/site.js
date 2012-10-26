var user = require('.././models/user');
io = module.parent.parent.exports.io;

var EventProvider = require('./../models/event').EventProvider;
EventProvider = new EventProvider();

exports.index = function(req, res){
	res.render('index', {title: 'index'});
}

exports.test = function(req, res){
	res.render('test', {title: 'test'});
}

exports.signin = function(req, res){
	res.render('signin', {title: 'signin', layout:'false', message:''});
}

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



exports.signup = function(req, res){
	res.render('signup', {title: 'signup', layout:'false'});
}


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

exports.save = function(req, res){
	//console.log('is this io?');
	//console.log(io);
	var event = req.body.event;
  EventProvider.createEvent(event, function(err, e){
  	// io.sockets.emit('product.added', product);
		//EventProvider.getEvents(0,10,function(err, events){
		//	res.send(events);
		//})
    io.sockets.emit('event.added', e);
    res.send(e);
	});
}

exports.queryByDate = function(req, res){
	var d = Date.parse(req.body.date);
	EventProvider.getEventsForDate(d, function(err, events){
		res.send(events);
	})
}


