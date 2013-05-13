var events = require('events'),
    util = require('util'),
    pollers = require('./poller'),
    _ = require('underscore');

var StatPoller = function(opts){
    //call constructor with the current context
    events.EventEmitter.call(this);

    options = _.defaults(opts || {}, {'delay' : 500});     
    this.delay = options.delay;
};
util.inherits(StatPoller, events.EventEmitter);


StatPoller.prototype.start = function(){
    _.forEach(pollers, function(poller, name){
        console.log(name + ": " + util.inspect(poller));
    });
}

exports.StatPoller = StatPoller;

