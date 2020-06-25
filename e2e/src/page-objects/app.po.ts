import { browser, $, $$, Key, ExpectedConditions, element } from 'protractor';

export const EC = ExpectedConditions;

export class AppPage {
  tabs = $('ion-tabs');
  tab = name => this.tabs.$(`ion-tab-button[tab="${name}"]`);

  navigateTo(page?) {
    return browser.get(page || '/');
  }

  currentUrl() {
    return browser.getCurrentUrl();
  }

  wait(callback, maxWaitTime?) {
    return browser.wait(callback, maxWaitTime);
  }
  sleep(ms) {
    return browser.sleep(ms);
  }
  waitForAngularEnabled() {
    return browser.waitForAngularEnabled(true);
  }
  waitForAngularDisabled() {
    return browser.waitForAngularEnabled(false);
  }

  waitUntilTabPresent() {
    return this.wait(EC.presenceOf(this.tabs));
  }

  async clickTab(tab) {
    await this.waitUntilTabPresent();
    return this.tab(tab).click();
  }
}
