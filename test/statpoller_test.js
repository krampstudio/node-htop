var _ = require('underscore');

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
        
        test.expect(2);
        
        var aPoller = new this.StatPoller();
        aPoller.on('start', function(){
            test.ok(true, 'the poller has started');
            test.equals(_.keys(aPoller.pollers).length, aPoller.intervalHandlers.length, 'there should be the same number of handlers than pollers');
            test.done();
        });
        aPoller.start();
        aPoller.stop();
    },
    
   'testStop': function(test) {
        'use strict';
        
        test.expect(2);
        
        var aPoller = new this.StatPoller();
        aPoller.on('stop', function(){
            test.ok(true, 'the poller has stopped');
            test.equals(aPoller.intervalHandlers.length, 0, 'all handlers references should have been removed');
            test.done();
        });
        aPoller.start();
        aPoller.stop();
    },
   
    'testFilterPollers': function(test) {
        'use strict';
        
        test.expect(2);
        
        var aPoller = new this.StatPoller({pollers : ['mem']});
        
        aPoller.on('start', function(){
            test.ok(true, 'the poller has started');
            test.equals(_.keys(aPoller.pollers).length, 1, 'there should be only one handler');
            test.done();
        });
        aPoller.start();
        aPoller.stop();
    },
    
    'testPoll': function(test) {
        'use strict';
    
        test.expect(6);
    
        var aPoller = new this.StatPoller({
            pollers: ['node-mem']
        }),
            counter = 1;
    
        aPoller.on('stat', function(data) {
            test.equals(data.type, 'node-mem');
            test.ok(typeof data.values === 'object');
            if (++counter > 3) {
                aPoller.stop();
                test.done();
            }
        });
        aPoller.start();
    }

};

