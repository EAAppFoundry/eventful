var express = require('express')
  , http = require('http')
  , path = require('path')
  , config = require('./config');



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


var server =http.createServer(app).listen(config.EnvConfig.port, function(){
  console.log("Express server listening on port " + config.EnvConfig.port);
});

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


module.exports.app = app;
routes = require('./routes');


















/*


var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});




*/