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

  fillInAccount(user) {
    this.wait(EC.visibilityOf(this.inputEmail));
    this.wait(EC.visibilityOf(this.inputPassword));
    this.inputEmail.sendKeys(user.email);
    return this.inputPassword.sendKeys(user.password);
  }

  removeEmailnPassword() {
    this.inputEmail.clear();
    return this.inputPassword.clear();
  }

  deleteEmail() {
    return this.inputEmail.sendKeys(Key.BACK_SPACE);
  }

  clickLogin() {
    this.wait(EC.visibilityOf(this.btnLogin));
    return this.btnLogin.click();
  }

  dismissAlert() {
    this.btnAlert.click();
    return this.wait(EC.invisibilityOf(this.btnAlert), 5000);
  }

  // native app testing
  waitUntilLoginPresent() {
    return this.wait(EC.presenceOf(this.inputEmail));
  }
}
