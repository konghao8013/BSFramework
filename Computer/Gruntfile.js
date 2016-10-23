module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //build: {
            // src: ['src/**/*.js'], 
            //   dest: 'dist/<%= pkg.name %>.js' 
            // }
            buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
                files: [
                    {
                        expand: true,
                        cwd: 'src',//js目录下
                        src: '**/*.js',//所有js文件
                        dest: 'dist'//输出到此目录下
                    },

                ]
            },
        },
        jshint: {
            files: ['src/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        //压缩HTML
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                  {
                      expand: true,
                      cwd: 'src',
                      src: ['**/*.html'],
                      dest: 'dist'
                  }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true
            },
            one: {
                src: ['src/**/*.'],/*'dist/test.js', 'dist/t/t9.js'*/
                dest: 'dist/computer-min.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                //tasks: ['jshint', 'uglify', 'concat']
                tasks: ['jshint']
            },
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.registerTask('default', ['uglify']);

};