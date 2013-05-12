/**
 * @fileoverview NodeUnit test for the module mem
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/mem_test
 */

/**
 * Test for the module mem
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the mem module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.mem = require('../lib/mem');
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
    
        test.expect(4);

        this.mem.poll(function(err, data){

            test.equal(err, null);
            test.equal((typeof data), 'object');
            test.ok(data.total > 0);
            test.ok(data.current > 0);
            test.done();
        });
    }
};
