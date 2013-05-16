/**
 * @fileoverview NodeUnit test for the module procinfo
 * @author Bertrand Chevrier <chevrier.bertrand@gmail.com>
 *
 * @module test/procinfo_test
 */

/**
 * Test for the module procinfo
 */
exports.ProcInfoTest = {

    /**
     * Set up by loading the procinfo module
     * @param {Function} done - to call once the setup is done.
     */
    setUp: function(done) {
        'use strict';
    
        this.procinfo = require('../lib/procinfo');
        done();
    },

    /**
     * Check the module structure
     * @param {Object} test - the test context
     */
    'testModule': function(test) {
        'use strict';
    
        test.notStrictEqual(this.procinfo, undefined, 'the procinfo should be available');
        test.equal(typeof this.procinfo.format, 'function', 'the procinfo should expose a format function');
    
        test.done();
    },

    /**
     * Test the format function
     * @param {Object} test - the test context
     */
    'testFormat': function(test) {
        'use strict';
    
        var content = '\
MemTotal:        7513900 kB\n\
MemFree:          122384 kB\n\
Buffers:         2340108 kB\n\
Cached:          2885380 kB\n\
SwapCached:         2504 kB\n\
Active:          3642184 kB\n\
Inactive:        2529332 kB\n\
Active(anon):     386000 kB\n\
Inactive(anon):   565084 kB\n\
Active(file):    3256184 kB\n';

        test.expect(4);
    
        this.procinfo.format(content, function(err, infos){
            test.equal(err, null);
            test.equal((typeof infos), 'object');
            test.equal(infos.MemTotal, '7513900 kB');
            test.equal(parseInt(infos.MemFree, 10), 122384);
            test.done();
        });
    }
};