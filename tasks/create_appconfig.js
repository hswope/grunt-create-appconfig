/*
 * grunt-create-appconfig
 * https://github.com/hswope/grunt-create-appconfig
 *
 * Copyright (c) 2015 Howard Swope
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('create_appconfig', 'Creates application configuration accesssible via require() based on grunt configuration entries.', function() {

    var data = null;

    // make sure src exists
    if (!this.data.src) {
      grunt.log.error('No data source was provided from which to create configuration.');
      return;
    }

    // if src is a string treat it as a path to a JSON file containing the configuration
    if (typeof this.data.src === 'string') {
      data = grunt.file.readJSON(this.data.src);
    }

    // if src is an object treat it as the data object representing the configuration
    else if (typeof this.data.src === 'object') {
      data = this.data.src;
    }

    // if src is something else error out
    else {
      grunt.log.error('The data source provided must be a file path to a json file or a json object.');
      return;
    }

    // get the name and path of the destination
    var dest = null;
    if (this.data.dest) {
      dest = this.data.dest;
      if (dest.charAt(dest.length-1) === '/' || dest.charAt(dest.length-1) === '\\'){
        dest += 'config.js';
      }
    }
    else {
      dest = './dist/config.js';
    }

    // create the file contents
    var config = '//grunt-create-appconfig auto generated configuration file\n\n';
    config += '\'use strict;\'\n\n';
    config += 'var config = ' + JSON.stringify(data) + ';\n\n';
    config += 'module.exports = config;\n';

    // write out file
    grunt.file.write(dest, config);

    // Print a success message.
    grunt.log.writeln('File "' + dest + '" created.');

  });
};
