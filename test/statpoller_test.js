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
        done();
    },

    /**
     * Check the StatPoller structure
     * @param {Object} test - the test context
     */
    'testStructure': function(test) {
        'use strict';
    
        var aPoller = new this.StatPoller();
    
        test.notStrictEqual(aPoller, undefined, 'the module should be available');
        test.strictEqual(typeof aPoller, 'object', 'the statPoller should be an instanc');
        test.ok(aPoller.hasOwnProperty('options'));
        test.equal(aPoller.options.delay, 1000, 'the default value of the delay should be 500ms');
        
        var otherPoller = new this.StatPoller({delay : 775});
        test.equal(otherPoller.options.delay, 775, 'the value of the delay should be 775ms');

        test.done();
    },
    
    'testStart': function(test) {
        'use strict';
        
        test.expect(1);
        
        var aPoller = new this.StatPoller();
        aPoller.on('start', function(){
            test.ok(true, 'the poller has started');
            test.done();
        });
        aPoller.start();
        aPoller.stop();
    }

};

