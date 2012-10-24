
app = module.parent.exports.app;

var siteController = require('./controllers/site');

app.get('/', siteController.index);
app.get('/test', siteController.test);
app.post('/test', siteController.save);
