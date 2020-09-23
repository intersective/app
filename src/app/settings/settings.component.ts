import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SettingService } from './setting.service';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { RouterEnter } from '@services/router-enter.service';
import { FastFeedbackService } from '../fast-feedback/fast-feedback.service';
import { FilestackService } from '@shared/filestack/filestack.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { PushNotificationService, PermissionTypes } from '@services/push-notification.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})

export class SettingsComponent extends RouterEnter {
  isNativeApp = Capacitor.isNative;

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
  firstVisitPermission: any;

  constructor (
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private settingService: SettingService,
    public storage: BrowserStorageService,
    public utils: UtilsService,
    private notificationService: NotificationService,
    private filestackService: FilestackService,
    public fastFeedbackService: FastFeedbackService,
    private newRelic: NewRelicService,
    private pushNotificationService: PushNotificationService
  ) {
    super(router);
    // forced "revisit" of this component whenever become reactivated
    activatedRoute.data.subscribe(fragment => {
      this.checkPermission();
    });
  }

  onEnter() {
    this.newRelic.setPageViewName('Setting');

    // get contact number and email from local storage
    this.profile.email = this.storage.getUser().email;
    this.profile.contactNumber = this.storage.getUser().contactNumber;
    this.profile.image = this.storage.getUser().image ? this.storage.getUser().image : 'https://my.practera.com/img/user-512.png';
    this.profile.name = this.storage.getUser().name;
    this.acceptFileTypes = this.filestackService.getFileTypes('image');
    // also get program name
    this.currentProgramName = this.storage.getUser().programName;
    this.currentProgramImage = this._getCurrentProgramImage();
    this.fastFeedbackService.pullFastFeedback().subscribe();
    this.returnLtiUrl = this.storage.getUser().LtiReturnUrl;
  }

  /**
   * check if current device has Push Notification permission allowed
   * criterias:
   *   - first visit of this page (nothing recording in localStorage)
   *   - permission allowed
   * @return {Promise<void>}
   */
  async checkPermission(): Promise<void> {
    this.firstVisitPermission = await this.pushNotificationService.promptForPermission(
      PermissionTypes.firstVisit,
      this.router.routerState.snapshot
    );
    if (this.firstVisitPermission) {
      await this.notificationService.pushNotificationPermissionPopUp('Would you like to be enable push notification?');
    }
    return;
  }

  // loading pragram image to settings page by resizing it depend on device.
  // in mobile we are not showing card with image but in some mobile phones on landscape mode desktop view is loading.
  // because of that we load image also in mobile view.
  private _getCurrentProgramImage () {
    if (!this.utils.isEmpty(this.storage.getUser().programImage)) {
      let imagewidth = 600;
      const imageId = this.storage.getUser().programImage.split('/').pop();
      if (!this.utils.isMobile()) {
        imagewidth = 1024;
      }
      return `${this.cdn}${imagewidth}/${imageId}`;
    }
    return '';
  }

  openLink() {
    this.newRelic.actionText('Open T&C link');
    window.open(this.termsUrl, '_system');
  }

  switchProgram() {
    if (this.returnLtiUrl) {
      this.newRelic.actionText('browse to LTI return link');
      window.location.href = 'https://' + this.returnLtiUrl;
    } else {
      this.newRelic.actionText('browse to program switcher');
      this.router.navigate(['switcher', 'switcher-program']);
    }
  }

  isInMultiplePrograms() {
    return this.storage.get('programs').length > 1;
  }

  // send email to Help request
  mailTo() {
    this.newRelic.actionText('mail to helpline');
    const mailto = 'mailto:' + this.helpline + '?subject=' + this.currentProgramName;
    window.open(mailto, '_self');
  }

  async goToSettingPermission() {
    const goSettingStatus = await this.pushNotificationService.goToAppSetting();
    return goSettingStatus;
  }

  async setInterests() {
    let interests = [];
    for (var i = 0; i < 100; ++i) {
      interests.push(`name-${i}`);
    }
    console.log('interests::', interests);
    const status = await this.pushNotificationService.subscribeToInterests(interests);
    console.log('subscribed?', status);
  }

  async getInterests() {
    const interests = await this.pushNotificationService.getSubscribedInterests();
    this.interests = interests;
    console.log(interests);
  }

  async linkUser() {
    const associated = await this.pushNotificationService.associateDeviceToUser(this.storage.getUser().email, this.storage.getUser().apikey);
    console.log(associated);
    this.associated = associated;
  }

  logout() {
    return this.authService.logout();
  }

  async uploadProfileImage(file, type = null) {
    if (file.success) {
      this.newRelic.actionText('Upload profile image');
      this.imageUpdating = true;
      this.settingService.updateProfileImage({
        image: file.data.url
      }).subscribe(
        success => {
          this.imageUpdating = false;
          this.profile.image = file.data.url;
          this.storage.setUser({
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
        err => {
          this.newRelic.noticeError(`Image upload failed: ${JSON.stringify(err)}`);
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
