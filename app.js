//imports
var express = require('express'), 
    controllers = require('./controller'), 
    http = require('http'), 
    path = require('path'),
    fs = require('fs'),
    lf = require('./lib/logFactory')(),
    sio = require('socket.io');

//create an http server using express
var app = express();
var server = http.createServer(app);

//set up the logger
lf.init(lf.levels.debug, true, './logs/node-htop.log'); 

//bind the server to socket.io
var io = sio.listen(server, {logger : lf.logger});

//set up middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(function(req, res, next){
    lf.logger.log('info', require('util').inspect(req.url));
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
  lf.logger.log('info', 'Express server listening on port ' + app.get('port'));
});
