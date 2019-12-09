// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  allScriptsTimeout: 11000,
  specs: [
    './src/features/*.feature',
    './src/features/desktop/*.feature'
  ],
  cucumberOpts: {
    require: [
      './src/steps/config.ts',
      './src/steps/*.steps.ts',
      './src/steps/desktop/*.steps.ts'
    ]
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['disable-dev-shm-usage', 'no-sandbox']
    }
  },
  directConnect: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    const chai = require('chai'); // chai
    const chaiAsPromised = require("chai-as-promised"); // deal with promises from protractor
    chai.use(chaiAsPromised); // add promise candy to the candy of chai
    global.chai = chai;
    require('ts-node').register({
      project: require('path').join(__dirname, 'tsconfig.e2e.json')
    });
  }
};
