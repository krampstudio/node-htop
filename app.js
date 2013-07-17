//first of all initialize the logger
var lf = require('./lib/logFactory').LogFactory;
var logger = lf.init(lf.levels.debug, true, './logs/node-htop.log'); 

//imports
var express = require('express'), 
    http = require('http'), 
    path = require('path'),
    fs = require('fs'),
    sio = require('socket.io'),
    RedisStore = require("socket.io/lib/stores/redis"),
    redis = require("socket.io/node_modules/redis"),
    pub = redis.createClient(16379, process.env.IP),
    sub = redis.createClient(16379, process.env.IP),
    client = redis.createClient(16379, process.env.IP),
    controllers = require('./controller');

//create an http server using express
var app = express();
var server = http.createServer(app);

//bind the server to socket.io
var io = sio.listen(server, {
    logger : logger,
    store : new RedisStore({
        redisPub : pub,
        redisSub : sub,
        redisClient : client
    })
});

//set up middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(function logRequest(req, res, next){
    logger.log('info', require('util').inspect(req.url) + 'by process ' + process.id);
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
