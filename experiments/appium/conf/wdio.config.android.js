const { join } = require('path');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  platformName: "Android",
  maxInstances: 1,
  'appium:app': join(
    process.cwd(), "./experiments/appium/Android-NativeDemoApp-0.2.1.apk"
    // process.cwd(), "./experiments/appium/appV2-debug.apk"
  ),
  'appium:deviceName': 'emulator-5554',
  // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/ApiDemos-debug.apk",
  // 'appium:appPackage': "com.practera.appv2",
  // 'appium:appActivity': ".MainActivity",
  // 'appium:chromedriverExecutableDir': '<PATH TO CHROME DRIVER>',
  'appium:platformVersion': '8.0',
  'appium:orientation': 'PORTRAIT',
  // `automationName` will be mandatory, see
  // https://github.com/appium/appium/releases/tag/v1.13.0
  'appium:automationName': 'UiAutomator2',
  'appium:noReset': true,
  'appium:fullReset': false,
  'appium:dontStopAppOnReset': true,
  'appium:newCommandTimeout': 60,
}];

/*config.specs = [
  './experiments/tests/steps/*.steps.js',
  // './experiments/tests/steps/*.spec.js',
];*/

config.cucumberOpts.require = ['./experiments/tests/steps/**/app*.steps.js'];

exports.config = config;
