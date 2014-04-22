var fs = require('fs'),
    os = require('os'),
    _ = require('lodash');

 /**
 * @module poller/load
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */
 module.exports = {

    /**
     * Structure of the expexted data to poll from the load avg
     */
    data : {
        p1 : 0,       //load avg period 5sec/1min
        p5 : 0,       //load avg period 5sec/5min
        p15 : 0       //...
    },

    /**
     * Poll memory data
     * @param {Function} cb - the callback as function(data) where data has the structure above
     */
    poll : function (cb){
        var self = this;

        if(cb === undefined || typeof cb !== 'function'){
            throw new Error('Required callback for the load#poll method');
        }
        var load = os.loadavg(),
            index = 0,
            stat = {};
        _.forEach(self.data, function(value, key){
            stat[key] = load[index++];
        });
        cb(stat);
    }
};
