
var _ = require('lodash'),
    fs = require('fs');

/**
 *  todo use name instead of level numbers
 */
module.exports = function(level, stdout, file){
    var config = { level : level };
    var logger = new (require('caterpillar').Logger)(config);
    var filter = new (require('caterpillar-filter').Filter)(config);
    var human  = new (require('caterpillar-human').Human)(config);
    
    this.levels = logger.config.levels;
 
    // filter and format output
    if(stdout){
        logger.pipe(filter).pipe(human).pipe(process.stdout);
    }
   
    if(file && file.trim().length > 0){
        logger.pipe(filter).pipe(fs.createWriteStream(file));
    }
    
    //map  each level to a method
    _.keys(this.levels).map(function mapLevel(levelName){
       logger[levelName] = _.partial(logger.log, levelName);
    });

    return logger;
};
