// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function(config) {
  config.set({
    basePath: "",
    browserDisconnectTimeout: 7000,
    browserNoActivityTimeout: 120000,
    browserSocketTimeout: 120000,
    captureTimeout: 120000,
    browserDisconnectTolerance: 1,
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ["progress", "kjhtml"],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: false, // print error summary
      suppressFailed: false, // information about failed tests
      suppressPassed: false, // information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true, // print the time elapsed for each spec,
      failFast: false // test would finish with error when a first fail occurs for prod.
    },
    port: 9876,
    colors: true,
    logLevel: config.DEBUG,
    browsers: ["ChromeNoSandbox"],
    customLaunchers: {
      ChromeNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    singleRun: true
  });
};
