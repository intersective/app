import { writeFileSync } from 'fs';
import { browser } from 'protractor';

describe('Screenshots', () => {
  it('shows text is visible', () => {
    browser.timeouts('implicit', 5000);

    // We need to switch to the native context for the screenshot to work
    browser.context('NATIVE_APP');

    // browser.screenshot returns the screenshot as a base64 string
    const textVisibleScreenshot = browser.screenshot();
    writeFileSync('screenshot-1.png', textVisibleScreenshot.value, 'base64');
  });
});
