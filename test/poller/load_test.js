/**
 * @fileoverview NodeUnit test for the module load
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/poller/load
 */

/**
 * Test for the module poller/load
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the load module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.load = require('../../lib/poller/load');
        done();
    },

    /**
     * Check the module structure
     * @param {Object} test - the test context
     */
    'testModule': function(test) {
        'use strict';
    
        test.notStrictEqual(this.load, undefined, 'the load module should be available');
        test.equal(typeof this.load, 'object', 'the load should expose an object');
    
        test.done();
    },

    /**
     * Test the poll method
     * @param {Object} test - the test context
     */
    'testPoll': function(test) {
        'use strict';
    
        test.expect(7);

        this.load.poll(function(data){

            test.equal((typeof data), 'object', 'the callback should be called with an object');
            test.ok(data.hasOwnProperty('p1'), 'the data should contains the p1 property');
            test.ok(data.hasOwnProperty('p5'), 'the data should contains the p5 property');
            test.ok(data.hasOwnProperty('p15'), 'the data should contains the p15 property');
                
            test.ok(data.p1 > 0 && data.p1 < 50);   //does the test run with a load of 50?  
            test.ok(data.p5 > 0 && data.p5 < 50);      
            test.ok(data.p15 > 0 && data.p15 < 50);
            test.done();
        });
    }
};
