// ##Routes.js
// This file is where you place all the routes for the app

// This is how you get access to the app object from app.js
app = module.parent.exports.app;

// These are references to the controllers
var siteController = require('./controllers/site');
var smsController = require('./controllers/sms');

//https://pass.is/TzkS9R

app.get('/', siteController.index);
app.get('/test', siteController.test);
app.post('/test', siteController.save);
app.get('/signin', siteController.signin);
app.post('/signin', siteController.signinPost);
app.get('/signup', siteController.signup);

// Routes for the api
app.get('/api/v1/events', siteController.events);
app.post('/api/v1/qdate', siteController.queryByDate);
app.get('/api/v1/events', siteController.events);
//http://localhost:3000/api/v1/events/10-28-2012
app.get('/api/v1/events/:date', siteController.eventsForDate);
// hate this route, need to change it... but how?
app.get('/api/v1/events/id/:id', siteController.eventID);
app.post('/api/v1/events', siteController.save);

// Routes for the twillio stuff
app.post('/twil/events', smsController.events);
app.get('/twil', smsController.index);


