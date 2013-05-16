module.exports = function(grunt) {
    'use strict';

    var sources = ['lib/**/*.js', 'controller/*.js', 'app.js'],
        tests = ['test/**/*_test.js'],
        buildDir = 'build/';

    // Project configuration.
    grunt.initConfig({
        jsdoc: {
            dist: {
                src: sources,
                options: {
                    destination: buildDir + 'doc'
                }
            }
        },
        nodeunit: {
            files: tests
        },
        jshint: {
            options: {
                camelcase: true,
                smarttabs: true,
                curly: true,
                multistr: true
            },
            server: {
                src: sources.concat(tests).concat(['Gruntfile.js']),
                options: {
                    node: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Default task.
    grunt.registerTask('default', ['jshint:server', 'nodeunit']);
    grunt.registerTask('test', ['nodeunit']);
};
