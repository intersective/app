import { DOCUMENT } from '@angular/common';
import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '@services/utils.service';
import { SharedService } from '@services/shared.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { VersionCheckService } from '@services/version-check.service';
import { environment } from '@environments/environment';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins, AppState, Capacitor } from '@capacitor/core';

const { App, SplashScreen } = Plugins;
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';
import { PushNotificationService } from './services/push-notification.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  hasCustomHeader$: Observable<any>;
  hasCustomHeader: boolean;
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
    private pushNotificationService: PushNotificationService,
    @Inject(DOCUMENT) private readonly document: Document,
    // private statusBar: StatusBar
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
    const hasOpened = this.storage.get('fastFeedbackOpening');
    if (hasOpened) { // set default modal status
      this.storage.set('fastFeedbackOpening', false);
    }
  }

  ngOnInit() {
    this.configVerification();
    fromPromise(this.sharedService.onPageLoad()).subscribe();

    this.getCustomConfigurations();
    this.analyseQueryParams();
  }

  initializeApp(): Promise<any> {
    /*
    this.platform.ready().then(async () => {
      if (environment.production && !Capacitor.isNative) {
        // watch version update
        this.versionCheckService.initiateVersionCheck();
      }

      if (Capacitor.isNative) {
        SplashScreen.hide();
        this.pushNotificationService.subscribeToInterests(environment.pusher.beamsDefaultInterest);
        App.addListener('appStateChange', (state: AppState) => {
          const pnPermission = this.storage.get('pushnotifications');
          if (!pnPermission) {
            this.pushNotificationService.requestPermission();
          }
          // state.isActive contains the active state
          console.log('App state changed. Is active?', state.isActive);
        });
      }

      // initialise Pusher
      await this.pusherService.initialise();

    });
    */


    return this.platform.ready().then(async () => {
      if (environment.production) {
        // watch version update
        this.versionCheckService.initiateVersionCheck();
      }
    // @TODO: need to build a new micro service to get the config and serve the custom branding config from a microservice
    // Get the custom branding info and update the theme color if needed
    /*
    // to be reviewed later under analyseQueryParams()
    const domain = this.document.location.hostname;
    this.authService.getConfig({domain}).subscribe(
      async (response: any) => {
        if (response !== null) {
          const expConfig = response.data;
          const numOfConfigs = expConfig.length;
          if (numOfConfigs > 0 && numOfConfigs < 2) {
            let logo = expConfig[0].logo;
            const themeColor = expConfig[0].config.theme_color;
            if (expConfig[0].config.html_branding && expConfig[0].config.html_branding.header) {
              this.customHeader = expConfig[0].config.html_branding.header;
            }
            if (this.customHeader) {
              this.customHeader = this.sanitizer.bypassSecurityTrustHtml(this.customHeader);
            }
            // add the domain if the logo url is not a full url
            if (!logo.includes('http') && !this.utils.isEmpty(logo)) {
              logo = environment.APIEndpoint + logo;
            }
            await this.nativeStorage.setObject('config', {
              'logo': logo,
              'color': themeColor
            });
            // use brand color if no theme color
            const user = await this.nativeStorage.getObject('me');
            if (!this.utils.has(user, 'themeColor') || !user.themeColor) {
              this.utils.changeThemeColor(themeColor);
            }
          }

          this.checkCustom('header').subscribe(hasHeader => {
            this.hasCustomHeader = hasHeader;
          });
        }
      },
      err => {
        this.newRelic.noticeError(`${JSON.stringify(err)}`);
      }
    );

    let searchParams = null;
    let queryString = '';
    if (this.document.location.search) {
      queryString =  this.document.location.search.substring(1);
    } else if (this.document.location.hash) {
      queryString = this.document.location.hash.substring(2);
    }
    searchParams = new URLSearchParams(queryString); */

      // initialise Pusher/ apollo when app loading if there stack info in storage
      this.sharedService.initWebServices();
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
        (response: any) => {
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

  /* checkCustom(type: string): Observable<any> {
    return fromPromise(this.authService.isAuthenticated()).pipe(map(authenticated => {
      return type === 'header' && this.customHeader && authenticated;
    }));
  } */
}
