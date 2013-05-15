var events = require('events'),
    util = require('util'),
    _ = require('underscore'),
    domain = require('domain');
    
 /**
 * @module statpoller
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */

/**
 * @constructor StatPoller
 * @augments EventEmitter
 * @param {Object} [options] - the poller options
 * @param {Number} [options.delay = 500] - the frequency to poll stat
 * @param {Array} [options.pollers] - the pollers to load, all by default
 */
var StatPoller = function(options){
    //call constructor with the current context
    events.EventEmitter.call(this);

    this.options = _.defaults(options || {}, {
        'delay' : 1000
    });
    
    this.pollers = {};
    this.intervalHandlers = [];
};
util.inherits(StatPoller, events.EventEmitter);

StatPoller.prototype.start = function(){
    var self = this;
    
    //get all the avaialable pollers
    _.forEach(require('./poller').Pollers, function(poller, name){
        //filter to get only the requested
        if(self.options.pollers === undefined || _.contains(self.options.pollers, name)){
            if(poller && poller.poll && typeof poller.poll === 'function'){
                self.pollers[name] = poller;
            }
        }
    });
    
    if(self.pollers.length === 0){
       //TODO inform there is no poller
    }
    
    //set minimal value for delays
    if(self.options.delay < 100 ){
        self.options.delay = 100;
    }
    
    //use domain to catch polling errors
    var pollingDomain = domain.create();
    pollingDomain.type = 'Polling Error';
    pollingDomain.on('error', function(err){
        console.error("%s : %s", err.domain.type, err.message);
        console.error(err.stack);
        self.emit('error', err);
    });
    pollingDomain.run(function(){
       
         _.forEach(self.pollers, function(poller, name){
            var handler = setInterval(function(){
                var stat = {
                    type : name
                };
                poller.poll(function(infos){
                    stat.values = infos;
                    
                    console.log("Emit %j", stat);
                    self.emit('stat', stat);
                });

            }, self.options.delay);
            self.intervalHandlers.push(handler);
        });

    });
    this.emit('start');
};

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
};

exports.StatPoller = StatPoller;
