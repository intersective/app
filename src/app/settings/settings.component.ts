import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SettingService } from './setting.service';
import { BrowserStorageService, User } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { RouterEnter } from '@services/router-enter.service';
import { FastFeedbackService } from '../fast-feedback/fast-feedback.service';
import { FilestackService } from '@shared/filestack/filestack.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { PushNotificationService } from '@services/push-notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})

export class SettingsComponent extends RouterEnter {

  routeUrl = '/app/settings';
  profile = {
    contactNumber: '',
    email: '',
    image: '',
    name: ''
  };
  currentProgramName = '';
  currentProgramImage = '';

  returnLtiUrl = '';

  helpline = 'help@practera.com';

  termsUrl = 'https://images.practera.com/terms_and_conditions/practera_terms_conditions.pdf';
  // controll profile image updating
  imageUpdating = false;
  acceptFileTypes;
  // card image CDN
  cdn = 'https://cdn.filestackcontent.com/resize=fit:crop,width:';
  interests: string;
  associated: any;

  constructor (
    public router: Router,
    private routes: ActivatedRoute,
    private authService: AuthService,
    private settingService: SettingService,
    public storage: BrowserStorageService,
    public utils: UtilsService,
    private notificationService: NotificationService,
    private filestackService: FilestackService,
    public fastFeedbackService: FastFeedbackService,
    private newRelic: NewRelicService,
    private pushNotificationService: PushNotificationService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    super(router);
  }

  onEnter() {
    this.newRelic.setPageViewName('Setting');
    this.routes.data.subscribe((data: {user: User}) => {
      const {
        email,
        contactNumber,
        image,
        name,
        programName,
        LtiReturnUrl
      } = data.user;

      // get contact number and email from local storage
      this.profile.email = email;
      this.profile.contactNumber = contactNumber;
      this.profile.image = image ? image : 'https://my.practera.com/img/user-512.png';
      this.profile.name = name;
      // also get program name
      this.currentProgramName = programName;
      this.returnLtiUrl = LtiReturnUrl;
    });

    this.acceptFileTypes = this.filestackService.getFileTypes('image');
    this._getCurrentProgramImage().then(res => {
      this.currentProgramImage = res;
    });
    this.fastFeedbackService.pullFastFeedback().subscribe();
  }

  // loading pragram image to settings page by resizing it depend on device.
  // in mobile we are not showing card with image but in some mobile phones on landscape mode desktop view is loading.
  // because of that we load image also in mobile view.
  private async _getCurrentProgramImage() {
    const { programImage } = await this.storage.getUser();
    if (!this.utils.isEmpty(programImage)) {
      let imagewidth = 600;
      const imageId = programImage.split('/').pop();
      if (!this.utils.isMobile()) {
        imagewidth = 1024;
      }
      return `${this.cdn}${imagewidth}/${imageId}`;
    }
    return '';
  }

  openLink() {
    this.newRelic.actionText('Open T&C link');
    this.document.open(this.termsUrl, '_system');
  }

  switchProgram() {
    if (this.returnLtiUrl) {
      this.newRelic.actionText('browse to LTI return link');
      this.document.location.href = 'https://' + this.returnLtiUrl;
    } else {
      this.newRelic.actionText('browse to program switcher');
      this.router.navigate(['switcher', 'switcher-program']);
    }
  }

  async isInMultiplePrograms() {
    const programs = await this.storage.nativeGet('programs');
    return programs.length > 1;
  }

  // send email to Help request
  mailTo() {
    this.newRelic.actionText('mail to helpline');
    const mailto = `mailto:${this.helpline}?subject=${this.currentProgramName}`;
    window.open(mailto, '_self');
  }

  async getInterests() {
    const interests = await this.pushNotificationService.getSubscribedInterests();
    this.interests = interests;
    console.log(interests);
  }

  async linkUser() {
    const { email, apikey } = await this.storage.getUser();
    const associated = await this.pushNotificationService.associateDeviceToUser(email, apikey);
    console.log(associated);
    this.associated = associated;
  }

  logout() {
    return this.authService.logout();
  }

  uploadProfileImage(file, type = null) {
    if (file.success) {
      this.newRelic.actionText('Upload profile image');
      this.imageUpdating = true;
      this.settingService.updateProfileImage({
        image: file.data.url
      }).subscribe(
        async success => {
          this.imageUpdating = false;
          this.profile.image = file.data.url;
          await this.storage.setUser({
            image: file.data.url
          });
          return this.notificationService.alert({
            message: 'Profile picture successfully updated!',
            buttons: [
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          });
        },
        async err => {
          await this.newRelic.noticeError(`Image upload failed: ${JSON.stringify(err)}`);
          this.imageUpdating = false;
          return this.notificationService.alert({
            message: 'File upload failed, please try again later.',
            buttons: [
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          });
        });
    } else {
      return this.notificationService.alert({
        message: 'File upload failed, please try again later.',
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
    }
  }

}
