const tsNode = require('ts-node');

const serverAddress = 'http://localhost:4723/wd/hub';
const testFilePAtterns = [
  // '**/*/*.e2e-spec.ts'
  './src/specs-native/**.e2e-spec.ts'
];
const iPhoneXCapability = {
  browserName: '',
  autoWebview: true,
  autoWebviewTimeout: 20000,
  app: '/Users/dsbr/ordina/e2e/superApp/platforms/ios/build/emulator/superApp.app',
  version: '11.4',
  platform: 'iOS',
  deviceName: 'iPhone X',
  platformName: 'iOS',
  name: 'My First Mobile Test',
  automationName: 'XCUITest'
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
  allScriptsTimeout: 11000,
  specs: testFilePAtterns,
  baseUrl: 'http://10.0.2.2:8000',
  // baseUrl: '',
  multiCapabilities: [
    androidEmulator,
    // iPhoneXCapability
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  seleniumAddress: serverAddress,
  onPrepare: () => {
    tsNode.register({
      project: './e2e/tsconfig.e2e.json'
    });
  }
};
