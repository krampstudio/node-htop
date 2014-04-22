var fs = require('fs'),
    _ = require('lodash');

 /**
 * @module poller/node-mem
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */
 module.exports = {

    /**
     * Structure of the expexted data to poll from the memory
     */
    data : {
        rss : 0,            //in memory (no swap)
        heapTotal : 0,      //v8 total mem
        heapUsed : 0        //v8 used mem
    },

    /**
     * Poll memory data
     * @param {Function} cb - the callback as function(data) where data has the structure above
     */
    poll : function (cb){
        var self = this;

        if(cb === undefined || typeof cb !== 'function'){
            throw new Error('Required callback for the node-mem#poll method');
        }
        cb(process.memoryUsage());
    }
};
