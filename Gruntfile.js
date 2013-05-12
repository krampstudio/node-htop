module.exports = function(grunt) {
    'use strict';

  // Project configuration.
  grunt.initConfig({
    jsdoc : {
        dist: {
            src: ['lib/*.js', 'controller/*.js', 'app.js'],
            options: {
                destination: 'doc'
            }
        }
    },
    nodeunit : {
        files : ['test/*_test.js']
    },
    jshint : {
        files : ['Gruntfile.js', 'lib/*.js', 'controller/*.js', 'app.js', 'test/*.js'],
        options: {
            node : true,
            smarttabs : true
        }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('test', ['nodeunit']);
};
