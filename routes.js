
app = module.parent.exports.app;

var siteController = require('./controllers/site');
var smsController = require('./controllers/sms');

// -------------- mickey comments -------------

//  routes?

//  get:    /api/v1/events              returns all.  used to paint initial screen
//  get:    /api/v1/events/[:id]        give me back that event
//  post:   /api/v1/events              new event from ui.
//  put:    /api/v1/events              event has been modified in ui.
//  delete: /api/v1/events/[:id]        delete this event
//  post:   /api/v1/events/search       non restful advanced search (post json packet of search stuffs)

//  What else am i missing???



app.get('/', siteController.index);
app.get('/test', siteController.test);
app.post('/test', siteController.save);
app.get('/signin', siteController.signin);
app.post('/signin', siteController.signinPost);
app.get('/signup', siteController.signup);


app.get('/api/v1/events', siteController.events);
app.post('/api/v1/qdate', siteController.queryByDate);
app.get('/api/v1/events', siteController.events);
// http://localhost:3000/api/v1/events/10-28-2012
app.get('/api/v1/events/:date', siteController.eventsForDate);
// hate this route, need to change it... but how?
app.get('/api/v1/events/id/:id', siteController.eventID);
app.post('/api/v1/events', siteController.save);

app.post('/twil/events', smsController.events);
app.get('/twil', smsController.index);

