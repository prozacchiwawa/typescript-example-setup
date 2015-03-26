var remapify = require('remapify');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['src/**/*.ts'],
                dest: 'build',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    basePath: 'src',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false
                },
                src: ['build/test/*.js']
            }
        },
        browserify: {
            dist: {
                files: {
                    'build/code.js': ['build/js/index.js']
                }
            },
            test: {
                files: {
                    'build/test.js': ['build/js/test.js']
                }
            },
            options: {
                preBundleCB: function(b) {
                    b.plugin(remapify, [
                        {
                            cwd: './build',
                            src: 'js/*.js',
                            expose: 'js'
                        }
                    ]);
                }
            }
        },
        tsd: {
            refresh: {
                options: {
                    command: "reinstall",
		    config: "tsd.json"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src', src: ['*.html','css/*.css'], dest: 'build/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-tsd');
    grunt.registerTask('default', ['tsd','typescript','browserify','mochaTest','copy']);
};
