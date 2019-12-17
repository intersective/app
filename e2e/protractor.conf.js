// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  allScriptsTimeout: 10 * 60 * 1000,
  specs: [
    './src/features/*.feature'
  ],
  cucumberOpts: {
    require: [
      './src/steps/config.ts',
      './src/steps/*.steps.ts'
    ]
  },
  multiCapabilities: [
    {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 5,
      specs: [
        './src/features/desktop/*.feature'
      ],
      chromeOptions: {
        args: ['--headless']
      }
    },
    {
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 5,
      specs: [
        './src/features/mobile/*.feature'
      ],
      chromeOptions: {
        args: ['--headless'],
        mobileEmulation : {
          deviceName: 'Galaxy S5'
        }
      }
    }
  ],
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
    browser.getCapabilities().then(cap => {
      if (cap.mobileEmulationEnabled) {
        global.device = 'mobile';
        return ;
      }
      global.device = 'desktop';
    });
    require('ts-node').register({
      project: require('path').join(__dirname, 'tsconfig.e2e.json')
    });
  }
};
