const protractor = require('protractor');
const tsNode = require('ts-node');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised"); // deal with promises from protractor
const wd = require('wd');
const wdBridge = require('wd-bridge')(protractor, wd);

const serverAddress = 'http://localhost:4723/wd/hub';
const testFilePAtterns = [
  // '**/*/*.e2e-spec.ts'
  './src/specs-native/**.e2e-spec.ts'
];
const iPhone8Capability = {
  browserName: '',
  autoWebview: true,
  autoWebviewTimeout: 20000,
  app: '/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/App.app',
  version: '13.0',
// platformVersion: "10.3",
  platform: 'iOS',
  deviceName: 'iPhone 8',
// deviceName: "iPhone 5s",
  platformName: 'iOS',
  name: 'My First Mobile Test',
  automationName: 'XCUITest'
// bundleId: "com.practera.appv2",
// udid: "435E6661-1FB3-4FDC-ADAF-42AEDE9EF859" // iOS 13.0
};

const androidEmulator = {
  browserName: '',
  autoWebview: true,
  autoWebviewTimeout: 20000,
  platformName: 'Android',
  deviceName: 'Android Emulator',
  platformVersion: "8",
  app: '/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/appV2-debug.apk',
  // app: '/Users/dsbr/ordina/e2e/superApp/platforms/android/build/outputs/apk/android-debug.apk',
  'app-package': 'com.practera.appv2',
  'app-activity': 'MainActivity',


  appPackage: 'com.practera.appv2',
  appActivity: '.MainActivity',
  automationName: 'UiAutomator2',
  nativeWebTap: 'true',
  autoAcceptAlerts: 'true',
  autoGrantPermissions: 'true',
  newCommandTimeout: 300000
};

exports.config = {
  allScriptsTimeout: 20000,
  specs: [
    './src/features/native.feature',
  ],
  cucumberOpts: {
    require: [
      './src/steps/config.ts',
      './src/steps/*.steps.ts'
    ]
  },
  // specs: testFilePAtterns,
  baseUrl: 'http://10.0.2.2:8000',
  // baseUrl: '',
  multiCapabilities: [
    // androidEmulator,
    iPhone8Capability
  ],
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  // framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  seleniumAddress: serverAddress,
  onPrepare: () => {
    chai.use(chaiAsPromised); // add promise candy to the candy of chai
    global.chai = chai;
    browser.getCapabilities().then(cap => {
      if (cap.get('mobileEmulationEnabled')) {
        global.device = 'mobile';
      } else {
        global.device = 'desktop';
      }
    });

    tsNode.register({
      project: './e2e/tsconfig.e2e.json'
    });

    wdBridge.initFromProtractor(exports.config);
  }
};
