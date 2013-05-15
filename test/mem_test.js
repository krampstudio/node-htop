/**
 * @fileoverview NodeUnit test for the module mem
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/mem_test
 */

/**
 * Test for the module poller/mem
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the mem module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.mem = require('../lib/poller/mem');
        done();
    },

    /**
     * Check the module structure
     * @param {Object} test - the test context
     */
    'testModule': function(test) {
        'use strict';
    
        test.notStrictEqual(this.mem, undefined, 'the mem module should be available');
        test.equal(typeof this.mem, 'object', 'the mem should expose an object');
    
        test.done();
    },

    /**
     * Test the poll method
     * @param {Object} test - the test context
     */
    'testPoll': function(test) {
        'use strict';
    
        test.expect(5);

        this.mem.poll(function(data){

            test.equal((typeof data), 'object');
            test.ok(data.memtotal > 256);       //i hope the tested system has more than 256b of memory, instead the test would never run...
            test.ok(data.memfree > 0);
            test.ok(data.swaptotal > 0);
            test.ok(data.swapfree > 0);
            test.done();
        });
    }
};
