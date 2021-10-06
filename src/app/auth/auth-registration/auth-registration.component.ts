import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { Md5 } from 'ts-md5/dist/md5';
import {
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { of, throwError, iif } from 'rxjs';
import { concatMap, retryWhen, delay } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { TermsConditionsPreviewComponent } from '../terms-conditions-preview/terms-conditions-preview.component';

@Component({
  selector: 'app-auth-registration',
  templateUrl: 'auth-registration.component.html',
  styleUrls: ['./auth-registration.component.scss']
})
export class AuthRegistrationComponent implements OnInit {
  password: string;
  confirmPassword: string;
  isAgreed = false;
  submitting = false;
  registerationForm: FormGroup;
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

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private notificationService: NotificationService,
    private newRelic: NewRelicService,
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
    this.registerationForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  validateQueryParams() {
    let redirect = [];
    redirect = ['login'];

    const verifyRegistration = this.newRelic.createTracer('verify registration');
    const getConfig = this.newRelic.createTracer('retrieve configurations');

    // access query params
    this.route.queryParamMap.subscribe(queryParams => {
      this.user.email = this.route.snapshot.paramMap.get('email');
      this.user.key = this.route.snapshot.paramMap.get('key');
      if (this.user.email && this.user.key) {
        // check is Url valid or not.
        this.authService.verifyRegistration({
            email: this.user.email,
            key: this.user.key
          }).subscribe(
            response => {
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
                }).subscribe(
                  res => {
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
                  },
                  err => {
                    getConfig();
                    this.newRelic.noticeError('Get configurations failed', JSON.stringify(err));
                    this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
                  }
                );
              }
            },
            error => {
              verifyRegistration();
              this.newRelic.noticeError('verification failed', JSON.stringify(error));
              this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
            }
          );
      } else {
        this.showPopupMessages('shortMessage', 'Registration link invalid!', redirect);
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

   /**
   * This method will log user in to the system.
   * - first it check for validation of password. if it invalid will show an error in UI.
   * - Then it call 'Core API' to register the new user by passing 'password', 'user_id', and 'key'.
   * - After API call success. Then it calling 'Login API' through 'authService.login' by passing 'username' and 'password'.
   * - If API call success 'Lgoin API' will return 'apikey'.
   * - Then method calling 'Core API' through 'authService.directLoginWithApikey' by passing 'apikey' got from response of 'authService.login'
   * - If API call success 'Core API' will return programs and other things related to login user.
   * to read more about flow check documentation (./docs/workflows/auth-workflows.md)
   */
  register() {
    this.submitting = true;
    if (this.validateRegistration()) {
      const nrRegisterTracer = this.newRelic.createTracer('registering');
      this.newRelic.actionText('Validated registration');
      if (this.unRegisteredDirectLink) {
        this._setupPassword();
      }
      this.authService
        .saveRegistration({
          password: this.confirmPassword,
          user_id: this.user.id,
          key: this.user.key
        })
        .subscribe(
          response => {
            nrRegisterTracer();
            const nrAutoLoginTracer = this.newRelic.createTracer('auto login');
            this.authService
              .login({
                username: this.user.email,
                password: this.confirmPassword
              })
              .pipe(
                // using retryWhen to handle errors
                retryWhen(errors => errors.pipe(
                // Use concat map to keep the errors in order and make sure they aren't executed in parallel
                concatMap((e, i) =>
                  // Executes a conditional Observable depending on the result of the first argument
                  iif(
                    // only retrying 3 times.
                    // why 3 times - it is not predictable how much time it takes to save user to global DB. so we try 3 times.
                    () => i > 3,
                    // If the condition is true we throw the error (the last error)
                    throwError(e),
                    // Otherwise we pipe this back into our stream and delay the retry
                    of(e).pipe(delay(3000)))
                )
              ))
              )
              .subscribe(
                async res => {
                  this.storage.set('isLoggedIn', true);
                  this.storage.stacks = res.stacks;
                  this.storage.loginApiKey = res.apikey;
                  this.storage.remove('unRegisteredDirectLink');
                  this.submitting = false;
                  this.showPopupMessages('shortMessage', 'Registration success!', ['switcher', 'switcher-program']);
                },
                err => {
                  nrAutoLoginTracer();
                  this.newRelic.noticeError('auto login failed', JSON.stringify(err));
                  this.submitting = false;
                  this.showPopupMessages('shortMessage', 'Auto login not completed! Please login using your new credentials');
                }
              );
          },
          error => {
            this.newRelic.noticeError('registration failed', JSON.stringify(error));
            this.submitting = false;

            if (this.utils.has(error, 'data.type')) {
              if (error.data.type === 'password_compromised') {
                return this.notificationService.alert({
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
              }
            }
            this.showPopupMessages('shortMessage', 'Registration not complete!');
          }
        );
    } else {
      this.submitting = false;
    }
  }

  removeErrorMessages() {
    this.errors = [];
  }

  validateRegistration() {
    let isValid = true;
    this.errors = [];
    if (this.unRegisteredDirectLink) {
      if (!this.isAgreed) {
        this.errors.push('You need to agree with terms and Conditions.');
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    }
    if (this.hide_password) {
      if (!this.isAgreed) {
        this.errors.push('You need to agree with terms and Conditions.');
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    } else if (this.registerationForm.valid) {
      const pass = this.registerationForm.controls.password.value;
      const confirmPass = this.registerationForm.controls.confirmPassword.value;
      if (pass !== confirmPass) {
        this.errors.push('Your passwords don\'t match.');
        isValid = false;
        return isValid;
      } else if (!this.isAgreed) {
        this.errors.push('You need to agree with terms and Conditions.');
        isValid = false;
        return isValid;
      } else {
        return isValid;
      }
    } else {
      for (const conrtoller in this.registerationForm.controls) {
        if (this.registerationForm.controls[conrtoller].errors) {
          isValid = false;
          for (const key in this.registerationForm.controls[conrtoller].errors) {
            if (
              this.registerationForm.controls[conrtoller].errors.hasOwnProperty(
                key
              )
            ) {
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
                  this.errors.push(this.registerationForm.controls.errors[key]);
              }
              return;
            }
          }
        }
      }
      return isValid;
    }
  }

  private showPopupMessages(type: string, message: string, redirect?: any) {
    this.notificationService
      .popUp(
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

  async termsAndConditionsPopup() {
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
  }

  get isMobile() {
    return this.utils.isMobile();
  }
}
