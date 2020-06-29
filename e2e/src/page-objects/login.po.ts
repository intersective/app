import { $, $$, Key } from 'protractor';
import { AppPage, EC } from './app.po';

export class LoginPage extends AppPage {
  inputEmail = $(`input[name="email"]`);
  inputPassword = $(`input[name="password"]`);
  btnLogin = $('app-auth-login').$('ion-button[type="submit"]');
  alertMsg = $('ion-alert').$('.alert-message');
  btnAlert = $('ion-alert').$('.alert-button');

  hasButton() {
    return this.btnLogin.getText();
  }

  insertEmail(email) {
    return this.inputEmail.sendKeys(email);
  }

  async fillInAccount(user) {
    await this.wait(EC.visibilityOf(this.inputEmail));
    await this.wait(EC.visibilityOf(this.inputPassword));
    await this.inputEmail.sendKeys(user.email);
    await this.inputPassword.sendKeys(user.password);
    return;
  }

  async removeEmailnPassword() {
    await this.inputEmail.clear();
    return this.inputPassword.clear();
  }

  deleteEmail() {
    return this.inputEmail.sendKeys(Key.BACK_SPACE);
  }

  clickLogin() {
    this.wait(EC.visibilityOf(this.btnLogin));
    return this.btnLogin.click();
  }

  async dismissAlert() {
    await this.btnAlert.click();
    return this.wait(EC.invisibilityOf(this.btnAlert), 5000);
  }

  // native app testing
  waitUntilLoginPresent() {
    return this.wait(EC.presenceOf(this.inputEmail));
  }
}
