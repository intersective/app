import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { UtilsService } from '@services/utils.service';
import { SharedService } from '@services/shared.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { BrowserStorageService } from '@services/storage.service';
import { VersionCheckService } from '@services/version-check.service';
import { environment } from '@environments/environment';
import { PusherService } from '@shared/pusher/pusher.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  customHeader: string | any;
  constructor(
    private platform: Platform,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService,
    private sharedService: SharedService,
    private authService: AuthService,
    private storage: BrowserStorageService,
    private versionCheckService: VersionCheckService,
    private pusherService: PusherService,
    private ngZone: NgZone,
    private newRelic: NewRelicService,
    public sanitizer: DomSanitizer,
    private $location: Location
  ) {
    this.customHeader = null;
    $location.subscribe(res => {
      console.log('lol', res);
    });
    this.activatedRoute.params.subscribe(res => {
      console.log('asdasdasd', res);
    });


/*    const stackUuid = searchParams.get('stack_uuid');
    if (stackUuid) {
      this.retrieveStackConfig(stackUuid);
    }
*/
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
    this.activatedRoute.url.subscribe(res => {
      console.log('asd:url', res);
    });
    this.activatedRoute.queryParamMap.subscribe(res => {
      console.log('asd', res);
    });
    this.activatedRoute.queryParams.subscribe(res => {
      console.log('@:',res);
      /*const stackUuid = res.get('stack_uuid');
      if (stackUuid) {
        this.retrieveStackConfig(stackUuid);
      }*/
    });

    this.configVerification();
    this.sharedService.onPageLoad();

    // @TODO: need to build a new micro service to get the config and serve the custom branding config from a microservice
    // Get the custom branding info and update the theme color if needed
    const domain = window.location.hostname;
    this.authService.getConfig({domain}).subscribe(
      (response: any) => {
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
            this.storage.setConfig({
              logo,
              color: themeColor
            });
            // use brand color if no theme color
            if (!this.utils.has(this.storage.getUser(), 'themeColor') || !this.storage.getUser().themeColor) {
              this.utils.changeThemeColor(themeColor);
            }
          }
        }
      },
      err => {
        this.newRelic.noticeError(`${JSON.stringify(err)}`);
      }
    );

    let searchParams = null;
    let queryString = '';
    if (window.location.search) {
      queryString =  window.location.search.substring(1);
    } else if (window.location.hash) {
      queryString = window.location.hash.substring(2);
    }
    searchParams = new URLSearchParams(queryString);

    if (searchParams.has('apikey')) {
      const queries = this.utils.urlQueryToObject(queryString);
      return this.navigate(['global_login', searchParams.get('apikey'), queries]);
    }

    if (searchParams.has('do')) {
      switch (searchParams.get('do')) {
        case 'secure':
          if (searchParams.has('auth_token')) {
            const queries = this.utils.urlQueryToObject(queryString);
            this.navigate([
              'secure',
              searchParams.get('auth_token'),
              queries
            ]);
          }
          break;
        case 'resetpassword':
          if (searchParams.has('key') && searchParams.has('email')) {
            this.navigate([
              'reset_password',
              searchParams.get('key'),
              searchParams.get('email')
            ]);
          }
          break;

        case 'registration':
          if (searchParams.has('key') && searchParams.has('email')) {
            this.navigate([
              'registration',
              searchParams.get('email'),
              searchParams.get('key')
            ]);
          }
          break;
      }
    }
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (environment.production) {
        // watch version update
        this.versionCheckService.initiateVersionCheck();
      }
      // initialise Pusher
      await this.pusherService.initialise();
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
   * retrieve stack config information: api endpoint url, and then store it into
   * localStorage + inject to every request (RequestModule)
   *
   * @param   {string}  stackUuid  uuid in string
   * @return  {void}
   */
  retrieveStackConfig(stackUuid: string): void {
    if (stackUuid) {
      this.authService.getStackConfig(stackUuid).subscribe(res => {
        this.storage.stackConfig = res;
      });
    }

    return this.storage.stackConfig;
  }
}
