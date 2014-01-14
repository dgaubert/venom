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
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // run typing "grunt"
  grunt.registerTask('default', ['jshint', 'mochaTest']);

};