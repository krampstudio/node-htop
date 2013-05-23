module.exports = function(grunt) {
    'use strict';

    var sources = ['lib/**/*.js', 'controller/*.js', 'app.js'],
        tests = ['test/**/*_test.js'],
        buildDir = 'build/';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        },
        uglify: {
            options: {
                banner:     '/* <%= pkg.name %> \n' 
                        +   '   <%= pkg.author.name %> <%= pkg.author.email %> copyright <%= grunt.template.today("yyyy") %> \n'
                        +   '   @license <%= pkg.licenses[0].type %> <%= pkg.licenses[0].url %>  \n*/\n'
            },
            build: {
                src: 'public/js/app.js',
                dest: 'public/js/app.min.js'
            }
        },
        mkdir : {
            dist: {
                dir: buildDir
            }
        },
        clean : {
            dist: {
                src: buildDir + "/**"
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    //custom clean
    grunt.registerMultiTask('clean', 'Clean up stuff.', function() {
        var fileApi = grunt.file,
            files = grunt.task.current.filesSrc;
            
        grunt.log.debug("will clean up " + files);
        
        files.forEach(function(filepath) {
            if (!fileApi.exists(filepath)) {
                return;
            }
            grunt.log.write('Cleaning "' + filepath + '"...');

            try {
                fileApi.delete(filepath);
                grunt.log.ok();
            }
            catch (e) {
                grunt.log.error();
                grunt.verbose.error(e);
                grunt.fail.warn('Clean failed.');
            }
        });
    });
    
    grunt.registerMultiTask('mkdir', 'creates stuff.', function() {
        var fs = require('fs'),
            done = grunt.task.current.async(),
            dir = grunt.task.current.data.dir;
            
        grunt.log.debug("will mkdir " + dir);
            
        fs.exists(dir, function(exists){
            if(exists === true){
                grunt.log.debug("Already exists");
                done();
            } else {
                fs.mkdir(dir , function(err){
                    if(err){
                        grunt.log.error();
                        grunt.verbose.error(err);
                        grunt.fail.warn('mkdir failed.');
                        return;
                    } 
                    grunt.log.ok();
                    done();
                })
            }
        });
    });

    // Default task.
    grunt.registerTask('default', ['jshint:server', 'nodeunit']);
    grunt.registerTask('test', ['nodeunit']);
};
