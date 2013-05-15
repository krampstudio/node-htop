
/**
 * Module dependencies.
 */

var express = require('express'), 
    controller = require('./controller'), 
    http = require('http'), 
    path = require('path');

var app = express();

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

//controller.index(app);

console.log('test')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
