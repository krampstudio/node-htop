/**
 * @fileoverview NodeUnit test for the StatPoller class
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/statpoller
 */

/**
 * Test for the module poller/mem
 */
exports.StatPollerTest = {

    /**
     * Set up by loading the module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
        
        //the pseudo class
        this.StatPoller = require('../lib/statpoller').StatPoller;

        //the pseudo instance
        this.statPoller = new this.StatPoller();
        done();
    },

    /**
     * Check the StatPoller structure
     * @param {Object} test - the test context
     */
    'testStructure': function(test) {
        'use strict';
    
        test.notStrictEqual(this.statPoller, undefined, 'the module should be available');
        test.strictEqual(typeof this.statPoller, 'object', 'the statPoller should be an instanc');
        test.ok(this.statPoller.hasOwnProperty('delay'));
        test.equal(this.statPoller.delay, 500, 'the default value of the delay should be 500ms');

        var otherPoller = new this.StatPoller({delay : 775});
        test.equal(otherPoller.delay, 775, 'the value of the delay should be 775ms');

        test.done();
    }

};

