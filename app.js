// ##App.js
// This is the app.js file
// its the main file that drives the app
// its set up in such a way that you never have to
// touch it once it's set up (except for config)
var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('./config');


var app = module.exports = express();
var redisStore = require('connect-redis')(express);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
});


app.configure('development', function(){
  app.use(express.errorHandler());
  config.setDevelopmentConfig();
  // use local session in prod (redis)
  var store = new redisStore();
  app.use(express.session({secret:"turner!", 
                          cookie: { maxAge: 48 * 60 * 60 * 1000 }, 
                          "store":store} ));
});

// **IMPORTANT**: call app router last...
app.configure(function(){
  app.use(app.router);
});


// Spin up the express server
var server =http.createServer(app).listen(config.EnvConfig.port, function(){
  console.log("Express server listening on port " + config.EnvConfig.port);
});

// Crank up Socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// Export the app and IO objects to use later in router.js
module.exports.app = app;
module.exports.io = io;

// Loads up the routes.js file
routes = require('./routes');

