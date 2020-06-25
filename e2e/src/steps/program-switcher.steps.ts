import { Given, When, Then } from 'cucumber';
const expect = global['chai'].expect;
import { ProgramSwitcherPage } from '../page-objects/program-switcher.po';
import { HomePage } from '../page-objects/home.po';
import { EC, AppPage } from '../page-objects/app.po';
import { $, element } from 'protractor';

const page = new ProgramSwitcherPage();

When(/^I choose (.+) program$/, async program => {
  switch (program) {
    case 'first':
      await page.waitUntilFirstCardClickable();
      await page.clickFirstCard();
      break;
  }
  return page.waitUntilTabPresent();
});

Then(/^I should be able to see tab options$/, async () => {
  const tabs = await page.waitUntilTabPresent();
  expect(tabs.isPresent()).to.be.true;
});


