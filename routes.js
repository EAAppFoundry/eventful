
app = module.parent.exports.app;

var siteController = require('./controllers/site');

app.get('/', siteController.index);
app.get('/test', siteController.test);
app.get('/api/v1/events', siteController.events);
app.post('/test', siteController.save);
app.post('/api/v1/qdate', siteController.queryByDate);
