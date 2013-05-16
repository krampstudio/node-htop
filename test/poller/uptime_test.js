/**
 * @fileoverview NodeUnit test for the module uptime
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/uptime_test
 */

/**
 * Test for the module poller/uptime
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the uptime module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.uptime = require('../../lib/poller/uptime');
        done();
    },

    /**
     * Check the module structure
     * @param {Object} test - the test context
     */
    'testModule': function(test) {
        'use strict';
    
        test.notStrictEqual(this.uptime, undefined, 'the uptime module should be available');
        test.equal(typeof this.uptime, 'object', 'the uptime should expose an object');
    
        test.done();
    },

    /**
     * Test the poll method
     * @param {Object} test - the test context
     */
    'testPoll': function(test) {
        'use strict';
    
        test.expect(3);

        this.uptime.poll(function(data){

            test.equal((typeof data), 'object', 'the callback should be called with an object');
            test.ok(data.hasOwnProperty('uptime'), 'the data should contains the uptime property');
            test.ok(data.uptime > 0);
            
            test.done();
        });
    }
};
