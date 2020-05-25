const { join } = require('path');
const { config } = require('./wdio.shared.conf');

config.capabilities = [{
  platformName: "Android",
  platformVersion: "8",
  deviceName: "Android Emulator",
  app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/appV2-debug.apk",
  // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/ApiDemos-debug.apk",
  appPackage: "com.practera.appv2",
  appActivity: ".MainActivity",
  automationName: "UiAutomator2"
}];

config.specs = [
  './experiments/specs/*.spec.ts',
];

exports.config = config;
