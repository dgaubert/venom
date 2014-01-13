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
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['default']
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // run typing "grunt test"
  grunt.registerTask('test', ['jshint']);

  // run typing "grunt"
  grunt.registerTask('default', ['jshint']);

};