/**
 * Helps you to setup a Caterpillar logger
 * @module logFactory
 */

 /**
  * SetUp the factory
  * @constructor
  * @alias module:LogFactory
  * @returns {Object} that contains the logger
  */
var logFactory = function(){

	var self = this;
	var _ = require('lodash');
	var fs = require('fs');
	var util = require('util');
	var caterpillar = require('caterpillar');

	/**
	 * Caterpillar Transform Filter to break lines in the raw logs
	 * @class BreakLine
	 * @private
     * @memberOf module:LogFactory
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
     * the list of logging levels
	 * @type {Object}
     * @public
	 * @memberOf module:LogFactory
	 */
	self.levels = new caterpillar.Logger().config.levels;

    /**
     * the logger instance itself
     * @type {Object}
     * @public
	 * @memberOf module:LogFactory
	 */
    self.logger = {};

	/**
     * initialize the logger
     * @public
     * @memberOf module:LogFactory
     * @param {Number} level - the logging level
     * @param {Boolean} [stdout] - the logger prints to the standard output
     * @param {String} [file] - a file path if present to write the logs into
	 */
	self.init = function(level, stdout, file){

		var config = { level : level };
		var logger = new caterpillar.Logger(config);
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

		_.keys(self.levels).map(function mapLevel(levelName){
			//map  each level to a method
			logger[levelName] = _.partial(logger.log, levelName);
		});

		self.logger = logger;
        return self.logger;
	};

    return self;
};

exports.LogFactory = logFactory();
