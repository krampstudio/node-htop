 var fs = require('fs'),
    _ = require('underscore');
 
 console.log('starting');
 
 var total, current;
 
 function getProcInfo(data, callback) {

    if (!data) {
        callback(new Error('Empty data'));
    }
     
    var infos = _.object(
        _.map(data.split('\n'), function(elt, key) {
            return _.map(elt.split(':'), function(elt){
                return elt.trim(); 
            });
        })
    );
     callback(null, infos);
 }
 
 fs.readFile('/proc/meminfo', 'utf8', function(err, data){
    if(err) throw err;
    if(total === undefined){
         getProcInfo(data, function(err, infos){
             
            console.log(require('util').inspect(infos));
             
         });
    }
 });
  console.log('to watch mem');