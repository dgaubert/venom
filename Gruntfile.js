module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        expr: true,
        globals: {
          console: true,
          module: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot',
          require: 'should',
          ui: 'bdd'
        },
        src: ['test/**/*.js']
      }
    },
    concat: {
      files: {
        src: ['lib/**/*.js'],
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy/mm/dd hh:MM:ss") %> */\n'
      },
      build: {
        src: ['build/<%= pkg.name %>-<%= pkg.version %>.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // run typing "grunt"
  grunt.registerTask('default', ['jshint', 'mochaTest', 'concat', 'uglify']);

};