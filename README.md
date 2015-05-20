# grunt-create-appconfig

> Creates application configuration accessible via require() based on grunt configuration entries.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-create-appconfig --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-create-appconfig');
```

## The "create_appconfig" task

### Overview
In your project's Gruntfile, add a section named `create_appconfig` to the data object passed into `grunt.initConfig()`.

    grunt.initConfig({
      create_appconfig: {
        options: {
          // Task-specific options go here.
        },
        your_target: {
          // Target-specific options go here.
        },
      },
    });

### Options

#### options.src
Type: `String` or `Object`

Default value: `undefined`

The src of configuration data. If src is a `String` it is treated as the path to a JSON file containing configuration data. If src is an `Object` it is treated as the configuration data. This is 
a required parameter and there is no default.

#### options.dest
Type: `String`

Default value: `'./dist/config.js'`

The path of the configuration file to be created. If a directory is specified, the file will be given the file name `config.js` in the specified directory.

### Usage Examples

#### Default Options
In this example, the default options are used to create a configuration. A src must be specified, so in this case a configuration module would be written to `./dist/config.js` exposing a 
configuration of `{key:dev_value}` if `create_appconfig:development` is run or `{key:prod_value}` if `create_appconfig:production` is run.

    grunt.initConfig({
      create_appconfig: {
        options: {},
        development: {
          src: {key:dev_value}
        },
        production: {
          src: {key:prod_value}
        },
      },
    });

#### Custom Options
In this example, custom options are used to create a configuration. A src must be specified and a dest is also specified, so in this case a configuration module would be 
written to `./dev_dist/config.js` exposing the configuration present in the file `config/development.json` if `create_appconfig:development` is run or 
a configuration module would be written to `./prod_dist/config.js` exposing the configuration present in the file `config/production.json` if `create_appconfig:production` is run.
 
    grunt.initConfig({
      create_appconfig: {
        options: {},
        development: {
          src: 'config/development.json',
          dest: './dev_dist/config.js'
        },
        production: {
          src: 'config/production.json',
          dest: './prod_dist/config.js'
        },
      },
    });

#### Using the Generated Configuration
If, for example, the configuration from the previous default options were used, this configuration could be used in your application in the following manner:

    var config = require('./config');
    
    console.log('The value of key is ' + config.key);

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Initial release supporting json files or objects. 
