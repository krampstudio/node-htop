var fs = require('fs'),
    procinfo = require('../procinfo'), 
    _ = require('lodash');
 
 /**
 * @module poller/mem
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */
 module.exports = { 

    /**
     * Structure of the expexted data to poll from the memory
     */
    data : {
        memtotal : 0,
        memfree : 0,
        swaptotal : 0,
        swapfree : 0
    }, 

    /**
     * Poll memory data
     * @param {Function} cb - the callback as function(data) where data has the structure above
     */
    poll : function (cb){
        var self = this;
        
        if(cb === undefined || typeof cb !== 'function'){
            throw new Error('Required callback for the mem#poll method');
        }

        fs.readFile('/proc/meminfo', 'utf8', function(err, data){
            if(err) {
                throw err;
            }
            procinfo.format(data, function(err, infos){
                if(err) {
                   throw err;
                }
                
                var normalized = {},
                    stat = {};
                _.map(infos, function(value, key){
                    if(key.length > 0){ 
                        normalized[key.toLowerCase()] = value;
                    }
                });
                    
                _.each(self.data, function(value, key){
                    if(!normalized[key]){
                        throw new Error(key + ' not found in mem infos');
                    }
                    //calculate the totals only once
                    stat[key] = parseInt(normalized[key], 10);
                });
                cb(stat);
            });
        });
    }
};
