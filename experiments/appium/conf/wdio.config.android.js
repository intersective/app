const { join } = require('path');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  platformName: "Android",
  platformVersion: "8",
  maxInstances: 1,
  app: join(
    process.cwd(), "./experiments/appium/appV2-debug.apk"
  ),
  // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/ApiDemos-debug.apk",
  'appium:appPackage': "com.practera.appv2",
  'appium:appActivity': ".MainActivity",
  // 'appium:chromedriverExecutableDir': '<PATH TO CHROME DRIVER>',
  'appium:platformVersion': '8.0',
  'appium:orientation': 'PORTRAIT',
  // `automationName` will be mandatory, see
  // https://github.com/appium/appium/releases/tag/v1.13.0
  'appium:automationName': 'UiAutomator2',
  // The path to the app
  'appium:app': join(
    process.cwd(), './apps/Android-NativeDemoApp-0.2.1.apk',
  )
}];

config.specs = [
  './experiments/tests/steps/*.spec.ts',
];

exports.config = config;
