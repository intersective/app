import { Injectable } from '@angular/core';
import { RequestService, QueryEncoder } from '@shared/request/request.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserStorageService } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { UtilsService } from '@services/utils.service';
import { PusherService } from '@shared/pusher/pusher.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  getConfig: 'api/v2/plan/experience/list',
  linkedin: 'api/auth_linkedin.json',
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

  constructor(
    private request: RequestService,
    private storage: BrowserStorageService,
    private nativeStorage: NativeStorageService,
    private utils: UtilsService,
    private router: Router,
    private pusherService: PusherService
  ) {}

  private _clearCache(): any {
    // do clear user cache here
  }

  private _login(body: HttpParams) {
    return this.request.post(api.login, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).pipe(map(res => this._handleLoginResponse(res)));
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
  async directLogin({ authToken }): Promise<Observable<Promise<any>>> {
    const body = new HttpParams()
      .set('auth_token', authToken);
    try {
      await this.logout({}, false);
      return this._login(body);
    } catch(err) {
      console.log('directLogin', err);
    }
  }

  private async _handleLoginResponse(response): Promise<any> {
    const norm = this._normaliseAuth(response);

    await this.nativeStorage.setObject('me', { apikey: norm.apikey });
    await this.nativeStorage.setObject('isLoggedIn', {isLoggedIn: true});
    await this.nativeStorage.setObject('programs', norm.programs);
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
            timeline.Program.config.theme_color = 'var(--ion-color-primary)';
          }
          return {
            enrolment: timeline.Enrolment,
            program: timeline.Program,
            project: timeline.Project,
            timeline: timeline.Timeline
          };
        },
        this
      ),
      config: (data.Experience || {}).config || {},
      _raw: rawData
    };
  }

  async isAuthenticated(): Promise<boolean> {
    const status = await this.nativeStorage.getObject('isLoggedIn');
    return status.isLoggedIn;
  }

  /**
   * Clear user's information and log the user out
   * @param navigationParams the parameters needed when redirect
   * @param redirect         Whether redirect the user to login page or not
   */
  async logout(navigationParams = {}, redirect = true) {
    // use the config color
    const config = await this.nativeStorage.getObject('config');
    this.utils.changeThemeColor(config.color || '#2bbfd4');
    this.pusherService.unsubscribeChannels();
    this.pusherService.disconnect();
    this.storage.clear();
    await this.nativeStorage.clear();
    // still store config info even logout
    await this.nativeStorage.setObject('config', config);
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
  forgotPassword(email: string): Observable<any>  {
    return this.request.post(api.forgotPassword, {
      email: email,
      domain: this.getDomain()
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
    return this.request.post(api.resetPassword, data);
  }

  /**
   * @name contactNumberLogin
   * @description fast/quick login with contact number
   * @param  {string}}        data [description]
   * @return {Observable<any>}      [description]
   */
  contactNumberLogin(data: { contactNumber: string }): Observable<any> {
    return this.request.post(api.login, {
      contact_number: data.contactNumber, // API accepts contact_numebr
    }).pipe(map(async response => {
      if (response.data) {
        this.storage.setUser({apikey: response.data.apikey});
        this.storage.set('tutorial', response.data.tutorial);

        await this.nativeStorage.setObject('me', {apikey: response.data.apikey});
        await this.nativeStorage.setObject('programs', response.data.timelines);
      }

      // @TODO: verify if safari browser localStorage store data above properly
      return response;
    }));
  }

  getConfig(data: ConfigParams): Observable<{data: ExperienceConfig[]}> {
    return this.request.get(api.getConfig, {
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
    return this.request.post(api.setProfile, data);
  }

  saveRegistration(data: RegisterData): Observable<any> {
    return this.request
    .post(api.register, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  verifyRegistration(data: VerifyParams): Observable<any> {
    return this.request
    .post(api.verifyRegistration, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * @name verifyResetPassword
   * @description make request to server to verity that user's email and key are valid
   * @param {[type]} data [description]
   * @return {Observable<any>}      [description]
  */
  verifyResetPassword(data: VerifyParams): Observable<any> {
    return this.request
    .post(api.verifyResetPassword, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
