// javascript

const { remote, wdio } = require("webdriverio");
const { assert } = require("assert");

const opts = {
  path: '/wd/hub',
  logLevel: 'trace',
  port: 4723,
  capabilities: {
    browserName: 'chrome',
    // follow instructions here: https://github.com/appium/appium/blob/master/docs/en/drivers/mac.md#getting-appiumformac
    platformName: 'mac' // require "AppiumForMac" driver
  }
};

async function main () {
  // const client = await wdio.remote(opts);
  const client = await remote(opts);

  await client.url('https://duckduckgo.com')

  const inputElem = await client.$('#search_form_input_homepage');
  await inputElem.setValue('WebdriverIO');

  const submitBtn = await client.$('#search_button_homepage');
  await submitBtn.click();

  console.log(await client.getTitle());
  await client.deleteSession();
}

try {
  main();
} catch (e) {
  console.warn(e);
}
