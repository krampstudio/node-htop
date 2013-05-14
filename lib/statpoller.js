var events = require('events'),
    util = require('util'),
    _ = require('underscore');
    
 /**
 * @module statpoller
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */

/**
 * @constructor StatPoller
 * @augments EventEmitter
 * @param {Object} [options] - the poller options
 * @param {Number} [options.delay = 500] - the frequency to poll stat
 */
var StatPoller = function(options){
    //call constructor with the current context
    events.EventEmitter.call(this);

    this.options = _.defaults(options || {}, {
        'delay' : 1000
    });
    
    this.pollers = [];
    this.intervalHandlers = [];
};
util.inherits(StatPoller, events.EventEmitter);

StatPoller.prototype.start = function(){
    var self = this;
    
    //get pollers
    _.forEach(require('./poller').Pollers, function(poller, name){
        if(poller && poller.poll && typeof poller.poll === 'function'){
            self.pollers.push(poller);
        }
    });
    
    if(self.pollers.length === 0){
        //TODO log no poller found
    }
    
    //TODO check delay
    
    _.forEach(self.pollers, function(poller, name){
        var handler = setInterval(function(){
            var stat = {
                type : name
            };
            poller.poll(function(err, infos){
                //TODO manage errors
                
                stat.values = infos;
                
                console.log("Emit %j", stat);
                self.emit('stat', stat);
            });

        }, self.options.delay);
        self.intervalHandlers.push(handler);
    });
    
    this.emit('start');
}

StatPoller.prototype.stop = function(){
    var self = this;
    _.forEach(self.intervalHandlers, function(handler, key){
        clearInterval(handler);
        
        if(typeof handler.ontimeout === 'function'){
            //not cleared!
            //TODO throw an error
            console.log("handler %d not cleared", key);
        }
    });
    //reset the handlers
    self.intervalHandlers = [];
    this.emit('stop');
}

exports.StatPoller = StatPoller;