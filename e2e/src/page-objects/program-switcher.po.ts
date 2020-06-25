import { browser, $, $$, Key } from 'protractor';
import { AppPage, EC } from './app.po';

export class ProgramSwitcherPage extends AppPage {
  parent = $('app-switcher-program');
  row = this.parent.$(`ion-row`);
  programCards = this.row.$$('ion-col');
  firstCard = this.row.$$('ion-col').first().$('ion-card');

  clickFirstCard() {
    return this.clickCard(0);
  }

  async clickCard(i) {
    const element = this.programCards.get(i).$('ion-card');
    await this.wait(EC.elementToBeClickable(element));
    return element.click();
  }

  async waitUntilFirstCardClickable() {
    await this.wait(EC.presenceOf(this.firstCard), 5000);
    return this.wait(EC.elementToBeClickable(this.firstCard));
  }

}
