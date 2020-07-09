import { Given, When, Then } from 'cucumber';
const expect = global['chai'].expect;
import { ProgramSwitcherPage } from '../page-objects/program-switcher.po';
import { HomePage } from '../page-objects/home.po';
import { EC, AppPage } from '../page-objects/app.po';
import { element, by } from 'protractor';

const page = new ProgramSwitcherPage();

When(/^I choose (.+) program$/, async program => {
  switch (program) {
    case 'first':
      await page.waitUntilFirstCardClickable();
      await page.clickFirstCard();
      return;
  }
  return page.waitUntilTabPresent();
});

Then(/^I should be able to see tab options$/, async () => {
  await page.waitForAngularDisabled();

  await page.wait(EC.visibilityOf(page.tabs));
  const isDisplayed = await page.tabs.isDisplayed();
  expect(isDisplayed).to.be(true);

  return page.waitForAngularEnabled();
});


