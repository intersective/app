import { browser, $, $$, Key } from 'protractor';
import { AppPage, EC } from './app.po';

export class SettingsPage extends AppPage {
  parent = $(`app-settings`);
  btnLogout = this.parent.$('#item-logout');

  async clickLogout() {
    await this.wait(EC.presenceOf(this.btnLogout));
    return this.btnLogout.click();
  }
}
