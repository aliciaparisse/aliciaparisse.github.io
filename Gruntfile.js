module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["assets"]
                },
                files: {
                    "assets/css/theme.css": "assets/less/theme.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        exec: {
            run_server: {
                cmd: "node serve.js"
            },
            build_index: {
                cmd: "node render.js"
            }
        },
        copy: {
            resumejson: {
                cwd: './',
                src: [ 'resume.json' ],
                dest: './node_modules/resume-schema',
                expand: true
            },
            build: {
                cwd: './assets/css',
                src: [ 'theme.css' ],
                dest: './build/assets/css',
                expand: true
            },
            favicon: {
                cwd: './',
                src: [ 'favicon.ico' ],
                dest: './build/',
                expand: true
            },
            images :{
                cwd: './assets',
                src: ['hy.png', 'hy.svg', 'alicia.jpg'],
                dest: './build/assets',
                expand: true
            },
            index:{
                cwd:'./build/',
                src:['index.html'],
                dest:'.',
                expand: true
            }
        },
        clean: {
            build: {
                src: [ 'build' ]
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that watches file changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Load the plugin to clean directories
    grunt.loadNpmTasks('grunt-contrib-clean')

    // Load the plugin to copy files
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks
    grunt.registerTask('default', ['exec']);
    grunt.registerTask('build', [
        'copy:resumejson',
        'clean',
        'copy:build',
        'copy:images',
        'copy:favicon',
        'less',
        'exec:build_index',
        'copy:index'
    ]);
    grunt.registerTask('serve', [
        'build',
        'exec:run_server'
    ])
}
