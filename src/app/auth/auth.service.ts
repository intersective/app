import { Injectable } from '@angular/core';
import { QueryEncoder, RequestService } from '@shared/request/request.service';
import { HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { environment } from '@environments/environment';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const API = {
  getConfig: 'api/v2/plan/experience/list',
  login: 'api/auths.json',
  setProfile: 'api/v2/user/enrolment/edit.json',
  verifyRegistration: 'api/verification_codes.json',
  register: 'api/registration_details.json',
  forgotPassword: 'api/auths.json?action=forgot_password',
  verifyResetPassword: 'api/auths.json?action=verify_reset_password',
  resetPassword: 'api/auths.json?action=reset_password'
};

interface VerifyParams {
  email: string;
  key: string;
}

interface RegisterData {
  password: string;
  user_id: number;
  key: string;
}

interface ConfigParams {
  domain?: string;
  id?: number | string;
  apikey?: string;
}

interface UserProfile {
  contactNumber: string;
}

interface ExperienceConfig {
  name: string;
  config?: {
    theme_color?: string;
    card_style?: string;
    review_rating?: boolean;
    review_rating_notification?: boolean;
    deep_link_in_app?: boolean;
    achievement_in_app_mentor?: boolean;
    achievement_in_app_participant?: boolean;
  };
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // added to cache deeplink for appv3 switching (purpose: global var reference)
  deeplink: string;

  constructor(
    private request: RequestService,
    private storage: BrowserStorageService,
    private utils: UtilsService,
    private router: Router,
    private pusherService: PusherService
  ) {}

  private _login(body: HttpParams, serviceHeader?: string) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      service: serviceHeader
    };
    if (!serviceHeader) {
      delete headers.service;
    }
    return this.request.post({
      endPoint: API.login,
      data: body.toString(),
      httpOptions: {
        headers
      },
      customErrorHandler: (err: any) => {
        console.log('catchError::', err);
        return of(err);
      }
    }).pipe(tap(res => {
      if (res?.data?.appv3 === true) {
        if (this.deeplink) {
          const onePageOnly = this.deeplink.match(/(one_page_only=true)/g);
          const redirectReview = this.deeplink.match(/(redirect=review)/g);
          if (onePageOnly !== null && redirectReview !== null) { // temporary allow review to be done on AppV2
            this.deeplink = null;
            return;
          }
        }

        this.storage.setAppV3(true);
        let finalURL = '';

        if (this.deeplink) {
          finalURL = this.deeplink.replace(/https?\:\/\/[\w\W]+\//g, environment.appv3URL);
        } else {
          finalURL = `${environment.appv3URL}?apikey=${res.data.apikey}`;
        }
        this.utils.redirectToUrl(finalURL);
        return;
      }
    }),     map(res => this._handleLoginResponse(res)));
  }

  /**
   * @name login
   * @description login API specifically only accept request data in encodedUrl formdata,
   *              so must convert them into compatible formdata before submission
   * @param {object} { email, password } in string for each of the value
   */
  login({ email, password }): Observable<any> {
    const body = new HttpParams({
      encoder: new QueryEncoder()
    })
      .set('data[User][email]', email)
      .set('data[User][password]', password)
      .set('domain', this.getDomain());

    return this._login(body);
  }

  /**
   * @name directLogin
   * @description login API specifically only accept request data in encodedUrl formdata,
   *              so must convert them into compatible formdata before submission
   * @param {object} { authToken } in string
   */
  directLogin({ authToken }): Observable<any> {
    const body = new HttpParams()
      .set('auth_token', authToken);
    this.logout({}, false);
    return this._login(body);
  }

  /**
   * @name globalLogin
   * @description login API specifically only accept request data in encodedUrl formdata,
   *              so must convert them into compatible formdata before submission
   * @param {object} { apikey } in string
   */
  globalLogin({ apikey, service }): Observable<any> {
    const body = new HttpParams()
      .set('apikey', apikey);
    this.logout({}, false);
    return this._login(body, service);
  }

  private _handleLoginResponse(response): Observable<any> {
    const norm = this._normaliseAuth(response);
    this.storage.setUser({ apikey: norm.apikey });
    this.storage.set('programs', norm.programs);
    this.storage.set('isLoggedIn', true);
    return norm;
  }

  private _normaliseAuth(rawData): any {
    const data = rawData.data;
    return {
      success: rawData.success,
      tutorial: data.tutorial,
      apikey: data.apikey,
      programs: data.Timelines.map(
        timeline => {
          // make sure 'Program.config.theme_color' exist
          if (!this.utils.has(timeline, 'Program.config.theme_color')) {
            if (!this.utils.has(timeline.Program, 'config')) {
              timeline.Program.config = {
                theme_color: 'var(--ion-color-primary)'
              };
            } else {
              timeline.Program.config.theme_color = 'var(--ion-color-primary)';
            }
          }
          return {
            enrolment: timeline.Enrolment,
            program: timeline.Program,
            project: timeline.Project,
            timeline: timeline.Timeline,
            experience: timeline.Experience,
          };
        },
        this
      ),
      config: (data.Experience || {}).config || {},
      _raw: rawData
    };
  }

  isAuthenticated(): boolean {
    return this.storage.get('isLoggedIn');
  }

  /**
   * Clear user's information and log the user out
   * @param navigationParams the parameters needed when redirect
   * @param redirect         Whether redirect the user to login page or not
   */
  logout(navigationParams = {}, redirect = true) {
    // use the config color
    this.utils.changeThemeColor(this.storage.getConfig().colors);
    this.pusherService.unsubscribeChannels();
    this.pusherService.disconnect();
    const config = this.storage.getConfig();

    this.storage.clear();
    // still store config info even logout
    this.storage.setConfig(config);

    if (redirect) {
      return this.router.navigate(['login'], navigationParams);
    }
  }

  /**
   * @name forgotPassword
   * @description make request to server to send out email with reset password url
   * @param  {string}}        email [user's email which will receive reset password url]
   * @return {Observable<any>}      [description]
   */
  forgotPassword(email: string): Observable<any> {
    return this.request.post({
      endPoint: API.forgotPassword,
      data: {
        email: email,
        domain: this.getDomain(),
      }
    });
  }

  getDomain() {
    let domain = window.location.hostname;
    domain =
      domain.indexOf('127.0.0.1') !== -1 ||
        domain.indexOf('localhost') !== -1
        ? 'dev.app-v2.practera.com'
        : domain;
    return domain;
  }

  /**
   * @name resetPassword
   * @description make request to server to reset user password
   * @param {[type]} data [description]
   * @return {Observable<any>}      [description]
   */
  resetPassword(data): Observable<any> {
    return this.request.post({
      endPoint: API.resetPassword, data
    });
  }

  // Activity ID is no longer used as a parameter,
  // but needs to be there so just pass in a 1
  connectToLinkedIn() {
    const url = '/api/auth_linkedin.json?apikey=' + this.storage.getUser().apikey + '&appkey=' + this.storage.get('appkey') + '&timeline_id=' + this.storage.getUser().timelineId;

    this.utils.openUrl(url);
    return;
  }

  /**
   * @name contactNumberLogin
   * @description fast/quick login with contact number
   * @param  {string}}        data [description]
   * @return {Observable<any>}      [description]
   */
  contactNumberLogin(data: { contactNumber: string }): Observable<any> {
    return this.request.post(
      {
        endPoint: API.login,
        data: {
          contact_number: data.contactNumber,
        }
      }).pipe(map(response => {
        if (response.data) {
          this.storage.setUser({ apikey: response.data.apikey });
          this.storage.set('tutorial', response.data.tutorial);
          this.storage.set('programs', response.data.timelines);
        }

        // @TODO: verify if safari browser localStorage store data above properly
        return response;
      }));
  }

  getConfig(data: ConfigParams): Observable<{ data: ExperienceConfig[] }> {
    return this.request.get(API.getConfig, {
      params: data
    });
  }

  /**
   * @name checkDomain
   * @description enforced domain checking before experience config API call
   * @param {[type]} data [description]
   */
  checkDomain(data): Observable<any> {
    if (!data.domain) {
      throw new Error('Tech Error: Domain is compulsory!');
    }

    return this.getConfig(data);
  }

  updateProfile(data: UserProfile): Observable<any> {
    return this.request.post(
      {
        endPoint: API.setProfile,
        data
      }
    );
  }

  saveRegistration(data: RegisterData): Observable<any> {
    return this.request.post(
      {
        endPoint: API.register,
        data,
        httpOptions: {
          headers: { 'Content-Type': 'application/json' }
        }
      });
  }

  verifyRegistration(data: VerifyParams): Observable<any> {
    return this.request.post(
      {
        endPoint: API.verifyRegistration,
        data,
        httpOptions: {
          headers: { 'Content-Type': 'application/json' }
        }
      });
  }

  /**
   * @name verifyResetPassword
   * @description make request to server to verity that user's email and key are valid
   * @param {[type]} data [description]
   * @return {Observable<any>}      [description]
  */
  verifyResetPassword(data: VerifyParams): Observable<any> {
    return this.request.post({
      endPoint: API.verifyResetPassword,
      data,
      httpOptions: {
        headers: { 'Content-Type': 'application/json' }
      }
    });
  }

  /**
   * @name getUUID
   * @description retrieve user UUID of current requester (user)
   * @return {Observable<string>} UUID in string
   */
  getUUID(): Observable<string> {
    return this.request.graphQLWatch(
      `query user {
        user {
          uuid
        }
      }`
    ).pipe(map(res => {
      if (res && res.data) {
        return res.data.user.uuid;
      }
      return null;
    }));
  }
}
