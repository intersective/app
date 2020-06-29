import { Given, When, Then } from 'cucumber';
const expect = global['chai'].expect;
import { LoginPage } from '../page-objects/login.po';
import { CORRECT_ACCOUNT } from '../../config';
import { EC } from '../page-objects/app.po';

const page = new LoginPage();

Given(/^App is loaded$/, async () => {
  await page.waitUntilLoginPresent();
});

When(/^I fill in (.+) account$/, account => {
  let email, password;
  switch (account) {
    case 'incorrect':
      email = 'abc@practera.com';
      password = 'abc';
      break;
    case 'correct':
      email = CORRECT_ACCOUNT[global['device']].email;
      password = CORRECT_ACCOUNT[global['device']].password;
      break;
  }
  return page.fillInAccount({
    email: email,
    password: password
  });
});

When(/^I remove email and password$/, () => {
  page.removeEmailnPassword();
  // add one more letter then remove it to trigger the form validation (disable the login button)
  page.insertEmail('a');
  return page.deleteEmail();
});

When(/^I click login button$/, () => {
  return page.clickLogin();
});

When(/^I click OK button of alert$/, () => {
  page.dismissAlert();
  return page.sleep(500);
});

Then(/^I should(.*) be able to click login button$/, async (not) => {
  if (not) {
    await page.waitForAngularDisabled();
    const disabled = await page.btnLogin.getAttribute('disabled');
    expect(disabled).to.equal('true');
    return page.waitForAngularEnabled();
  }
  const disabled = await page.btnLogin.getAttribute('disabled');
  return expect(disabled).to.be.null;
});

Then(/^I should see alert message$/, () => {
  return expect(page.alertMsg.getText()).to.eventually.include('incorrect');
});

