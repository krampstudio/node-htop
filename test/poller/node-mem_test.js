/**
 * @fileoverview NodeUnit test for the module node-mem
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/poller/nodemem
 */

/**
 * Test for the module poller/node-mem
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.nodemem = require('../../lib/poller/node-mem');
        
        done();
    },

    /**
     * Check the module structure
     * @param {Object} test - the test context
     */
    'testModule': function(test) {
        'use strict';
    
        test.notStrictEqual(this.nodemem, undefined, 'the node-mem module should be available');
        test.equal(typeof this.nodemem, 'object', 'the node-mem should expose an object');
    
        test.done();
    },

    /**
     * Test the poll method
     * @param {Object} test - the test context
     */
    'testPoll': function(test) {
        'use strict';
    
        test.expect(7);

        this.nodemem.poll(function(data){

            test.equal((typeof data), 'object', 'the callback should receive an object');
            test.ok(data.hasOwnProperty('rss'), 'the data should contains the rss property');
            test.ok(data.hasOwnProperty('heapTotal'), 'the data should contains the heapTotal property');
            test.ok(data.hasOwnProperty('heapUsed'), 'the data should contains the heapUsed property');
            
            test.ok(data.rss > 0);
            test.ok(data.heapTotal > 256);
            test.ok(data.heapUsed > 0);
            
            test.done();
        });
    }
};
