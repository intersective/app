import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { Md5 } from 'ts-md5/dist/md5';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { SwitcherService } from '../../switcher/switcher.service';
import { TermsConditionsPreviewComponent } from '../terms-conditions-preview/terms-conditions-preview.component';

@Component({
  selector: 'app-auth-registration',
  templateUrl: './auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export class AuthRegistrationComponent implements OnInit {
  password: string;
  confirmPassword: string;
  isAgreed = false;
  registrationForm: FormGroup;
  hide_password = false;
  user: any = {
    email: null,
    key: null,
    contact: null,
    id: null
  };
  domain = window.location.hostname;
  // validation errors array
  errors: Array<any> = [];
  showPassword = false;
  // for unregisterd users using direct link
  unRegisteredDirectLink = false;
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private notificationService: NotificationService,
    private newRelic: NewRelicService,
    private switcherService: SwitcherService,
    private modalController: ModalController,
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.domain =
      this.domain.indexOf('127.0.0.1') !== -1 ||
      this.domain.indexOf('localhost') !== -1
        ? 'appdev.practera.com'
        : this.domain;
    this.validateQueryParams();
    this.newRelic.setPageViewName('registration');
    if (this.storage.get('unRegisteredDirectLink')) {
      this.unRegisteredDirectLink = true;
    }
  }

  initForm() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  validateQueryParams() {
    const redirect = ['login'];

    const verifyRegistration = this.newRelic.createTracer('verify registration');
    const getConfig = this.newRelic.createTracer('retrieve configurations');

    // access query params
    this.route.queryParamMap.subscribe(async () => {
      this.user.email = this.route.snapshot.paramMap.get('email');
      this.user.key = this.route.snapshot.paramMap.get('key');

      if (this.user.email && this.user.key) {
        // check is Url valid or not.
        this.authService.verifyRegistration({
          email: this.user.email,
          key: this.user.key
        }).subscribe(response => {
          verifyRegistration();

          if (response) {
            const user = response.data.User;
            // Setting user data after registration verified.
            this.user.contact = (user || {}).contact_number || null;
            this.user.id = user.id;

            // Update storage data
            this.storage.setUser({
              contactNumber: this.user.contact,
              email: this.user.email
            });

            // get app configaration
            this.authService.checkDomain({
              domain: this.domain
            }).subscribe(res => {
              getConfig();

              let data = (res.data || {}).data;
              data = this.utils.find(data, function(datum) {
                return (
                  datum.config && datum.config.auth_via_contact_number
                );
              });
              if (data && data.config) {
                if (data.config.auth_via_contact_number === true) {
                  this.hide_password = true;
                  this.user.password = this.autoGeneratePassword();
                  this.confirmPassword = this.user.password;
                }
              }
            },           async err => {
              getConfig();
              this.newRelic.noticeError('Get configurations failed', JSON.stringify(err));
              await this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
            });
          }
        },           async error => {
          verifyRegistration();
          this.newRelic.noticeError('verification failed', JSON.stringify(error));
          await this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
        });
      } else {
        await this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
      }
    });
  }

  private autoGeneratePassword() {
    const text = Md5.hashStr('').toString();
    const autoPass = text.substr(0, 8);
    return autoPass;
  }

  openLink() {
    const fileURL = 'https://images.practera.com/terms_and_conditions/practera_default_terms_conditions_july2018.pdf';
    this.newRelic.actionText(`opened ${fileURL}`);
    window.open(fileURL, '_system');
  }

  register() {
    this.submitting = true;
    if (this.validateRegistration()) {
      const nrRegisterTracer = this.newRelic.createTracer('registering');
      this.newRelic.actionText('Validated registration');
      if (this.unRegisteredDirectLink) {
        this._setupPassword();
      }

      return this.authService
        .saveRegistration({
          password: this.confirmPassword,
          user_id: this.user.id,
          key: this.user.key
        })
        .subscribe(
          response => {
            nrRegisterTracer();
            const nrAutoLoginTracer = this.newRelic.createTracer('auto login');
            return this.authService
              .login({
                email: this.user.email,
                password: this.confirmPassword
              })
              .subscribe(
                async res => {
                  const loggedIn = await res;
                  nrAutoLoginTracer();
                  this.storage.remove('unRegisteredDirectLink');
                  const route = await this.switcherService.switchProgramAndNavigate(loggedIn.programs);
                  await this.showPopupMessages('shortMessage', 'Registration success!', route);
                  this.submitting = false;
                  return;
                },
                async err => {
                  nrAutoLoginTracer();
                  this.newRelic.noticeError('auto login failed', JSON.stringify(err));
                  await this.showPopupMessages('shortMessage', 'Registration not complete!');
                  this.submitting = false;
                  return;
                }
              );
          },
          async error => {
            this.newRelic.noticeError('registration failed', JSON.stringify(error));

            if (this.utils.has(error, 'data.type')) {
              if (error.data.type === 'password_compromised') {
                await this.notificationService.alert({
                  message: `We’ve checked this password against a global database of insecure passwords and your password was on it. <br>
                    Please try again. <br>
                    You can learn more about how we check that <a href="https://haveibeenpwned.com/Passwords">database</a>`,
                  buttons: [
                    {
                      text: 'OK',
                      role: 'cancel'
                    }
                  ],
                });
                this.submitting = false;
                return;
              }
            }
            await this.showPopupMessages('shortMessage', 'Registration not complete!');
            this.submitting = false;
            return;
          }
        );
    }
    this.submitting = false;
    return;
  }

  removeErrorMessages() {
    this.errors = [];
  }

  /**
   * validate registration link & form
   *
   * @return {boolean} true = valid & false = invalid
   */
  validateRegistration(): boolean {
    let isValid = true;
    this.errors = [];
    const tncMsg = 'You need to agree with terms and Conditions.';

    if (this.unRegisteredDirectLink) {
      if (!this.isAgreed) {
        this.errors.push(tncMsg);
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    }
    if (this.hide_password) {
      if (!this.isAgreed) {
        this.errors.push(tncMsg);
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    } else if (this.registrationForm.valid) {
      const pass = this.registrationForm.controls.password.value;
      const confirmPass = this.registrationForm.controls.confirmPassword.value;
      if (pass !== confirmPass) {
        this.errors.push('Your passwords don\'t match.');
        isValid = false;
        return isValid;
      } else if (!this.isAgreed) {
        this.errors.push(tncMsg);
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    } else {
      for (const controller in this.registrationForm.controls) {
        if (this.registrationForm.controls.hasOwnProperty(controller)) {

          const thisErrors = this.registrationForm.controls[controller].errors;

          if (thisErrors) {
            isValid = false;
            for (const key in thisErrors) {
              if (thisErrors.hasOwnProperty(key)) {
                switch (key) {
                  case 'required':
                    this.errors.push('Please fill in your password');
                    break;
                  case 'minlength':
                    this.errors.push(
                      'Your password needs to be more than 8 characters.'
                    );
                    break;
                  default:
                    this.errors.push(this.registrationForm.controls.errors[key]);
                }
              }
            }
          }
        }
      }
      return isValid;
    }
  }

  private showPopupMessages(type: string, message: string, redirect?: any): Promise<void> {
    return this.notificationService.popUp(
      type,
      {
        message: message
      },
      redirect ? redirect : false
    );
  }

  private _setupPassword() {
    if (this.password) {
      this.user.password = this.password;
    } else {
      this.user.password = this.autoGeneratePassword();
    }
    this.confirmPassword = this.user.password;
  }

  async termsAndConditionsPopup(): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({
      component: TermsConditionsPreviewComponent,
      swipeToClose: false,
      backdropDismiss: false
    });
    await modal.present();
    modal.onWillDismiss().then((modalData) => {
      if (modalData.data && (modalData.data.isAgreed)) {
        this.isAgreed = modalData.data.isAgreed;
      }
    });
    return modal;
  }

}
