var express = require('express'), 
    controllers = require('./controller'), 
    http = require('http'), 
    path = require('path'),
    app = express(),
    server = http.createServer(app),
    logger = require('./lib/logger')(7);
    io = require('socket.io').listen(server, {logger : logger});

//set up middleware
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(function(req, res, next){
    logger.log('info', require('util').inspect(req.url));
    next();
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

//set up controlllers
controllers.sysinfos(app);
controllers.stat(io);

//start the server
server.listen(app.get('port'), function listenServer(){
  logger.log('info', 'Express server listening on port ' + app.get('port'));
});
