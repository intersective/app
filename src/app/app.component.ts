import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '@services/utils.service';
import { SharedService } from '@services/shared.service';
import { AuthService } from './auth/auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { VersionCheckService } from '@services/version-check.service';
import { environment } from '@environments/environment';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  customHeader: string | any;
  constructor(
    private platform: Platform,
    private router: Router,
    public utils: UtilsService,
    private sharedService: SharedService,
    private authService: AuthService,
    private storage: BrowserStorageService,
    private versionCheckService: VersionCheckService,
    private ngZone: NgZone,
    private newRelic: NewRelicService,
    public sanitizer: DomSanitizer,
    readonly pushNotificationService: PushNotificationService,
  ) {
    this.customHeader = null;
    this.initializeApp();
  }

  // force every navigation happen under radar of angular
  private navigate(direction): Promise<boolean> {
    return this.ngZone.run(() => {
      return this.router.navigate(direction);
    });
  }

  private configVerification(): void {
    if (this.storage.get('fastFeedbackOpening')) { // set default modal status
      this.storage.set('fastFeedbackOpening', false);
    }
  }

  ngOnInit() {
    this.configVerification();
    this.sharedService.onPageLoad();

    this.getCustomConfigurations();
    this.analyseQueryParams();
  }

  initializeApp() {
    return this.platform.ready().then((): void => {
      if (environment.production) {
        // watch version update
        this.versionCheckService.initiateVersionCheck();
      }

      // initialise Pusher/ apollo when app loading if there stack info in storage
      this.sharedService.initWebServices();


      this.pushNotificationService.initiatePushNotification().then(() => {
        this.pushNotificationService.getSubscribedInterests().then(subscription => {
          console.log('Push notification subscriptions::', subscription);
        });
      });
    });
  }

  /**
   * checking conditions to show custom header
   * @param type header
   */
  checkCustom(type: string): boolean {
    if (type === 'header' && this.customHeader && this.authService.isAuthenticated()) {
      return true;
    }
    return false;
  }

  /**
   * find specific URL parameters in URL and act on them
   *
   * @return  {Promise<any>} deferred navigation to other page based on
   *                          value available in URL
   */
  analyseQueryParams(): Promise<any> {
    const searchParams = this.utils.getQueryParams();

    if (searchParams.has('do')) {
      switch (searchParams.get('do')) {
        case 'secure':
          if (searchParams.has('auth_token')) {
            const queries = this.utils.urlQueryToObject(searchParams.toString());
            return this.navigate([
              'secure',
              searchParams.get('auth_token'),
              queries
            ]);
          }
          break;

        case 'resetpassword':
          if (searchParams.has('apikey')) {
            return this.navigate([
              'reset_password',
              searchParams.get('apikey')
            ]);
          }
          break;

        case 'registration':
          if (searchParams.has('key') && searchParams.has('email')) {
            return this.navigate([
              'registration',
              searchParams.get('email'),
              searchParams.get('key')
            ]);
          }
          break;
      }
    }

    if (searchParams.has('apikey')) {
      const queries = this.utils.urlQueryToObject(searchParams.toString());
      return this.navigate(['global_login', searchParams.get('apikey'), queries]);
    }
  }

  // @TODO: need to build a new micro service to get the config and serve the custom branding config from a microservice
  /**
   * this will call core API to get custom branding and will update branding info.
   * it will only call core API if url have stack_uuid or storage have stackConfig.
   */
  getCustomConfigurations() {
    const queryParams = this.utils.getQueryParams();
    if (queryParams.has('stack_uuid') || this.storage.stackConfig) {
      const domain = window.location.hostname;
      this.authService.getConfig({domain}).subscribe(
        (response) => {
          if (response !== null) {
            const expConfig = response.data;
            const numOfConfigs = expConfig.length;
            if (numOfConfigs > 0 && numOfConfigs < 2) {
              let logo = expConfig[0].logo;

              const config = expConfig[0].config || {}; // let it fail gracefully

              if (config.html_branding && config.html_branding.header) {
                this.customHeader = config.html_branding.header;
              }
              if (this.customHeader) {
                this.customHeader = this.sanitizer.bypassSecurityTrustHtml(this.customHeader);
              }

              // add the domain if the logo url is not a full url
              if (!logo.includes('http') && !this.utils.isEmpty(logo)) {
                logo = environment.APIEndpoint + logo;
              }
              const colors = {
                theme: config.theme_color,
              };
              this.storage.setConfig({
                logo,
                colors,
              });

              // use brand color from getConfig API if no cached color available
              // in storage.getUser()
              if (!this.utils.has(this.storage.getUser(), 'colors') || !this.storage.getUser().colors) {
                this.utils.changeThemeColor(colors);
              }
            }
          }
        },
        err => {
          this.newRelic.noticeError(`${JSON.stringify(err)}`);
        }
      );
    }
  }
}
