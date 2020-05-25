// javascript

const wdio = require("webdriverio");
const assert = require("assert");

const opts = {
  path: '/wd/hub',
  port: 4723,
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

async function main () {
  const client = await wdio.remote(opts);
  // await client.shake();

  const field = await client.$('[name="email"]');
  console.log(field);
  await field.setValue("chaw@test.com");
  const value = await field.getText();
  assert.equal(value, "chaw@test.com");

  await client.deleteSession();
}

main();
