
app = module.parent.exports.app;

var siteController = require('./controllers/site');


// -------------- mickey comments -------------

//  routes?

//  get:    /api/v1/events             returns all.  used to paint initial screen
//  get:    /api/v1/events/[:UTCDate]  returns events for given date
//  get:    /api/v1/event/[:id]        give me back that event
//  post:   /api/v1/event              new event from ui.
//  put:    /api/v1/event              event has been modified in ui.
//  delete: /api/v1/event/[:id]        delete this event
//  post:   /api/v1/searchEvents       non restful advanced search (post json packet of search stuffs)

//  What else am i missing???



app.get('/', siteController.index);
app.get('/test', siteController.test);
app.get('/api/v1/events', siteController.events);
app.post('/test', siteController.save);
app.post('/api/v1/qdate', siteController.queryByDate);

app.get('/api/v1/events', siteController.events);
// http://localhost:3000/api/v1/events/10-28-2012
app.get('/api/v1/events/:date', siteController.eventsForDate);
app.get('/api/v1/events/id/:id', siteController.eventID);
