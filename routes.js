
app = module.parent.exports.app;

var siteController = require('./controllers/site');

app.get('/mickey', siteController.mickey);
app.get('/', siteController.index);
app.post('/', siteController.save);
