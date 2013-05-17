var express = require('express'), 
    controllers = require('./controller'), 
    http = require('http'), 
    path = require('path'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    logger = require('./lib/logger')(7);


app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('xxx'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({
	src: __dirname + '/public/css',
	debug : true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

controllers.stat(io);

server.listen(app.get('port'), function listenServer(){
  logger.log('info', 'Express server listening on port ' + app.get('port'));
});
