var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('./config/config');

var app = module.exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
});




app.configure('development', function(){
  app.use(express.errorHandler());

  config.setDevelopmentConfig();

});


http.createServer(app).listen(config.EnvConfig.port, function(){
  console.log("Express server listening on port " + config.EnvConfig.port);
});

module.exports.app = app;
routes = require('./routes');
