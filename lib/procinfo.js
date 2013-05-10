var _ = require('underscore');

/**
 * @module procinfo
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 */
 
/**
 * Format the content of an info file in the unix /proc fs
 * @param {String} data - the content to format
 * @param {Function} callback - 
 */ 
exports.format = function formatProcInfos(data, callback) {

    'use strict';

    if (!data) {
        callback(new Error('Empty data'));
    }
     
    callback(null, _.object(                                //map the splitted elts to an objet
        _.map(data.split('\n'), function(elt, key) {        //split by line and 
            return _.map(elt.split(':'), function(elt){     //resplit each line by :
                return elt.trim();                          //and trim the content
            });
        })
    ));
 }