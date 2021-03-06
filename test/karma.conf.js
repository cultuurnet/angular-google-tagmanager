// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-26 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.min.js',
      'bower_components/lodash/dist/lodash.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/*.js',
      "test/spec/**/*.js",
      "test/spec/**/*.*.js",
      "test/spec/**/*.spec.js",
      "test/spec/**/*.*.spec.js",
      "test/spec/**/*/*.spec.js",
      "test/spec/**/*/*.*.spec.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8088,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-coverage",
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    preprocessors: {
      'src/*.js': ['coverage']
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

  });
};
