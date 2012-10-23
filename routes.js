
app = module.parent.exports.app;

var siteController = require('./controllers/site');


app.get('/', siteController.index);
