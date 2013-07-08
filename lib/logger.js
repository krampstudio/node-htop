
var _ = require('lodash'),
    fs = require('fs'),
    util = require('util'),
    caterpillar = require('caterpillar');

/**
 * Caterpillar Transform Filter to break lines in the raw logs
 * @class BreakLine 
 * @extends caterpillar.Transform
 * @param {Object} config - see carterpillar.Transform
 */    
var BreakLine = function(config){
    caterpillar.Transform.call(this, config);
};
util.inherits(BreakLine, caterpillar.Transform);    

BreakLine.prototype._transform = function(chunk, encoding, next){
    return next(null, this.format(JSON.parse(chunk.toString())));
};
BreakLine.prototype.format = function(entry){
   return JSON.stringify(entry) + "\n";
};

/**
 *  todo use name instead of level numbers
 */
module.exports =  function(level, stdout, file){
    var self = this;
    var config = { level : level };
    var logger = new (caterpillar.Logger)(config);
    var filter = new (require('caterpillar-filter').Filter)(config);
    var human  = new (require('caterpillar-human').Human)(config);
    var br = new BreakLine(config);

    // filter and format output
    var filtered = logger.pipe(filter);
    
    //to stdout 
    if(stdout){
        filtered.pipe(human).pipe(process.stdout);
    }
   
    //append to file
    if(file && file.trim().length > 0){
        filtered.pipe(br).pipe(fs.createWriteStream(file, {flag : 'a'}));
    }
    
    //expose the levels
    this.levels = logger.config.levels;
    

    _.keys(this.levels).map(function mapLevel(levelName){
        //map  each level to a method
        logger[levelName] = _.partial(logger.log, levelName);
    });

    return logger;
};
