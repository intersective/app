import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@v3/services/auth.service';
import { FastFeedbackService } from '@v3/services/fast-feedback.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { UtilsService } from '@v3/services/utils.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { FilestackService } from '@v3/services/filestack.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  routeUrl = '/settings';
  mode: string;
  profile = {
    contactNumber: '',
    email: '',
    image: '',
    name: ''
  };
  hasMultipleStacks = false;
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

  constructor(
    public router: Router,
    private readonly route: ActivatedRoute,
    private authService: AuthService,
    private storage: BrowserStorageService,
    readonly utils: UtilsService,
    private notificationsService: NotificationsService,
    private filestackService: FilestackService,
    private fastFeedbackService: FastFeedbackService,
  ) {
    this.route.queryParams.subscribe(() => {
      this.onEnter();
    });
  }

  onEnter() {
    this.mode = this.route.snapshot.data.mode;

    const user = this.storage.getUser();
    const {
      email,
      contactNumber,
      image,
      name,
      programName,
      LtiReturnUrl,
    } = user;
    // get contact number and email from local storage
    this.profile.email = email;
    this.profile.contactNumber = contactNumber;
    this.profile.image = image ? image : 'https://my.practera.com/img/user-512.png';
    this.profile.name = name;
    this.currentProgramName = programName;
    this.returnLtiUrl = LtiReturnUrl;

    this.acceptFileTypes = this.filestackService.getFileTypes('image');
    this.currentProgramImage = this._getCurrentProgramImage();
    this.fastFeedbackService.pullFastFeedback().subscribe();
  }

  // loading pragram image to settings page by resizing it depend on device.
  // in mobile we are not showing card with image but in some mobile phones on landscape mode desktop view is loading.
  // because of that we load image also in mobile view.
  private _getCurrentProgramImage() {
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

  openLink(event) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    window.open(this.termsUrl, '_system');
  }

  switchProgram(event) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    if (this.returnLtiUrl) {
      this.utils.redirectToUrl(this.returnLtiUrl);
    } else {
      this.router.navigate(['switcher', 'switcher-program']);
    }
  }

  isInMultiplePrograms() {
    return this.storage.get('programs').length > 1;
  }

  // send email to Help request
  mailTo(event) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    const mailto = 'mailto:' + this.helpline + '?subject=' + this.currentProgramName;
    window.open(mailto, '_self');
  }

  logout(event) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    return this.authService.logout({}, true);
  }

  async uploadProfileImage(file, type = null) {
    if (file.success) {
      this.imageUpdating = true;
      this.authService.updateProfileImage({
        image: file.data.url
      }).subscribe(
        () => {
          this.imageUpdating = false;
          this.profile.image = file.data.url;
          this.storage.setUser({
            image: file.data.url
          });
          return this.notificationsService.alert({
            message: 'Profile picture successfully updated!',
            buttons: [
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          });
        },
        () => {
          this.imageUpdating = false;
          return this.notificationsService.alert({
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
      return this.notificationsService.alert({
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