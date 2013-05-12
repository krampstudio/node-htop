var fs = require('fs'),
    procinfo = require('./procinfo')     
    _ = require('underscore');
 
 module.exports = { 

    data : {
        total : 0,
        current : 0,
        swapTotal : 0,
        swapCurrent : 0
    }, 

    poll : function (cb){
        var self = this;
        
        if(cb !== undefined && typeof cb !== 'function'){
            throw new Error('Required callback for the mem#poll method');
        }

        fs.readFile('/proc/meminfo', 'utf8', function(err, data){
            if(err) {
                cb(err);
                return;
            }
            procinfo.format(data, function(err, infos){
                if(err) {
                    cb(err);
                    return;
                }
                
                //do some checks on the infos
                if(!_.has(infos, 'MemTotal') || !_.has(infos, 'MemFree')
                    || !_.has(infos, 'SwapTotal') || !_.has(infos, 'SwapFree')){
                   cb(new Error("Unable to retrieve memory data"));
                }

                //extract the needed data
                if(self.data.total === 0){
                    self.data.total = parseInt(infos['MemTotal'], 10);
                }
                self.data.current = self.data.total - parseInt(infos['MemFree'], 10);
                 
                if(self.data.swapTotal === 0){
                    self.data.swapTotal = parseInt(infos['SwapTotal'], 10);
                }
                self.data.swapCurrent = self.data.swapTotal - parseInt(infos['SwapFree'], 10);
                
                cb(null, self.data);
            });
        });
    }
}
