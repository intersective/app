// javascript

const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "iOS",
    // platformVersion: "10.3",
    platformVersion: "13.0",
    deviceName: "iPhone 8",
    // deviceName: "iPhone 5s",
    app: "/Users/chaw/Library/Developer/Xcode/DerivedData/App-cvarjtqhgqbiiafzicghiszsxenl/Build/Products/Debug-iphonesimulator/App.app",
    // app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/AppV2.ipa",
    // appPackage: "io.appium.android.apis",
    // bundleId: "com.practera.appv2",
    automationName: "XCUITest",
    udid: "435E6661-1FB3-4FDC-ADAF-42AEDE9EF859" // iOS 13.0
    // udid: "B8AC9E7E-C1D0-4939-B16F-0F111FEB304D" // iOS 12
    // udid: "2DD449D3-2890-4FFA-BF25-8B41B2E043C7" // iOS 10
  }
  /*capabilities: {
    platformName: "Android",
    platformVersion: "8",
    deviceName: "Android Emulator",
    app: "/Users/chaw/Workspaces/www/intersective/practera-app-v2/experiments/ApiDemos-debug.apk",
    appPackage: "io.appium.android.apis",
    appActivity: ".view.TextFields",
    automationName: "UiAutomator2"
  }*/
};

async function main () {
  const client = await wdio.remote(opts);
  await client.shake();

  const field = await client.$("android.widget.EditText");
  await field.setValue("Hello World!");
  const value = await field.getText();
  assert.equal(value,"Hello World!");

  await client.deleteSession();
}

main();
