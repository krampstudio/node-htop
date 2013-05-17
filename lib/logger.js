/**
 *  todo use name instead of level numbers
 */
module.exports = function(level){
    var logger = new (require('caterpillar').Logger)({level:level});
    var filter = new (require('caterpillar-filter').Filter)();
    var human  = new (require('caterpillar-human').Human)();
    
    // Pipe logger output to filter, then filter output to stdout
    logger.pipe(filter).pipe(human).pipe(process.stdout);
    
    // If we are debugging, then write the original logger data to debug.log
    if ( level === 7 ) {
        logger.pipe(require('fs').createWriteStream('./build/debug.log'));
    }
};