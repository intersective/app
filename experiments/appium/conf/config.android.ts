import { webdriverio } from 'webdriverio';

const config: Webdriverio.config = {
  path: '/wd/hub',
  port: 4723,
  services: [
    ['appium', {
      logPath : './',
      defaultCapabilities: {
        platformName: "Android",
        platformVersion: "8",
        deviceName: "Android Emulator",
        app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/appV2-debug.apk",
        // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/ApiDemos-debug.apk",
        appPackage: "com.practera.appv2",
        appActivity: ".MainActivity",
        automationName: "UiAutomator2"
      }
    }]
  ],
  capabilities: {
    platformName: "Android",
    platformVersion: "8",
    deviceName: "Android Emulator",
    app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/appV2-debug.apk",
    // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/appium/ApiDemos-debug.apk",
    appPackage: "com.practera.appv2",
    appActivity: ".MainActivity",
    automationName: "UiAutomator2"
  }
};

export { config };
