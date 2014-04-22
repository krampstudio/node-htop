var fs = require('fs'),
    os = require('os');

 /**
 * @module poller/uptime
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */
 module.exports = {

    /**
     * Expected polled structure
     * @type {Object}
     * @property {Number} uptime - in seconds
     */
    data : {
        uptime : 0
    },

    /**
     * Poll uptime data
     * @param {Function} cb - the callback as function(data) where data has the structure above
     */
    poll : function (cb){
        var self = this;

        if(cb === undefined || typeof cb !== 'function'){
            throw new Error('Required callback for the node-mem#poll method');
        }
        cb({uptime : Math.floor(os.uptime())});
    }
};
