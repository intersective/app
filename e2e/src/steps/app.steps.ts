import { Given, When, Then } from 'cucumber';
const expect = global['chai'].expect;
import { AppPage, EC } from '../page-objects/app.po';
import { REGISTRATION } from '../../config';
import { wdBrowser } from 'wd-bridge';
import { element, by, $ } from 'protractor';

const page = new AppPage();

Given(/^I go to the (.+) page$/, pageType => {
  let route = '/';
  switch (pageType) {
    case 'home':
      route = '/app/home';
      break;
    case 'login':
      route = '/login';
      break;
  }
  return page.navigateTo(route);
});

Given(/^I go to the (.*)correct (.+) link$/, (incorrect, linkType) => {
  let route = '/';
  switch (linkType) {
    case 'registration':
      if (incorrect) {
        route = `/?do=registration&key=incorrect&email=incorrect@practera.com`;
      } else {
        route = `/?do=registration&key=${REGISTRATION[global['device']].key}&email=${REGISTRATION[global['device']].email}`;
      }
      break;
  }
  return page.navigateTo(route);
});

When(/^I click the (.+) tab$/, async tabType => {
  // page.wait(EC.page.login)
  // await page.clickTab(tabType);
  try {
    await page.wait(EC.elementToBeClickable($('ion-tabs').$(`ion-tab-button[tab="settings"]`)));
  } catch (e) {
    console.log(e);
  }

  try {
    await page.waitForAngularDisabled();
    await $('ion-tabs').$(`ion-tab-button[tab="settings"]`).click();
    await page.waitForAngularEnabled();
  } catch (e) {
    console.log(e);
  }
  console.log('reach here bo?');
});

Then(/^I should dismiss virtual keyboard$/, () => {
  global['wdBrowser'].hideDeviceKeyboard();
});

Then(/^I should be on the home page on native app$/, async () => {
  try {
    let currentUrl = await page.currentUrl();
    return expect(currentUrl).to.include('/app/home');
  } catch (e) {
    console.log('watswrong?::', e);
  }
});

Then(/^I should be on the settings page on native app$/, async () => {
  try {
    let currentUrl = await page.currentUrl();
    return expect(currentUrl).to.include('/app/settings');
  } catch (e) {
    console.log('watswrong?::', e);
  }
});

Then(/^I should be on the (.+) page$/, async pageType => {
  try {
    let currentUrl = await page.currentUrl();
    console.log('how here?', currentUrl);

    let route = '/';
    switch (pageType) {
      case 'registration':
        route = '/registration';
        break;
      case 'login':
        route = '/login';
        break;
      case 'home':
        route = '/app/home';
        break;
      case 'program switcher':
        route = '/switcher/switcher-program';
        break;
      case 'settings':
        route = '/app/settings';
        break;
    }
    console.log('url::', currentUrl);

    const expectation = expect(currentUrl).to.include(route);
    return expectation;
  } catch (e) {
    console.log('watswrong?::', e);
  }
});

