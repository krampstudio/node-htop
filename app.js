//first of all initialize the logger
var lf = require('./lib/logFactory').LogFactory;
var logger = lf.init(lf.levels.debug, true, './logs/node-htop.log'); 

//imports
var express = require('express'), 
    http = require('http'), 
    path = require('path'),
    fs = require('fs'),
    sio = require('socket.io'),
    controllers = require('./controller');

//create an http server using express
var app = express();
var server = http.createServer(app);

//bind the server to socket.io
var io = sio.listen(server, {logger : logger});

//set up middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(function(req, res, next){
    logger.log('info', require('util').inspect(req.url));
    next();
});
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('secret'));
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
