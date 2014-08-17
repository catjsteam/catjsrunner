/**
 * Created by retyk on 16/02/14.
 */


module.exports = function (grunt) {
    grunt.initConfig({

            exec: {
                mocha: {
                    options: [ '--reporter xunit', '--colors', '--recursive'],
                    cmd: 'mocha <%= exec.mocha.options.join(" ") %> > report.xml'
                }
            },

            copy: {
                main: {
                    expand: true,
                    cwd: 'src/',
                    src: '**/*',
                    dest: 'lib/'
                },
                apk: {
                    expand: true,
                    cwd: '../CAT/runner/mobile/android/target/',
                    src: '*.apk',
                    dest: 'lib/resources/'
                }
            },
            clean: {
                lib: {src: 'lib'}
            }
/*
            compress: {
                main: {
                    options: {
                        archive: 'archive.tgz',
                        mode: 'tgz'

                    },
                    files: [
                        {expand: true, cwd: 'lib/', src: ['**'], dest: 'lib/'}, // makes all src relative to cwd
                        {src: ['package.json'], dest: '.', filter: 'isFile'}
                    ]
                }
            }*/
        }
    );
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('build', ['clean', 'copy']);
    grunt.registerTask('test', []);
    grunt.registerTask('default', ['test']);
}