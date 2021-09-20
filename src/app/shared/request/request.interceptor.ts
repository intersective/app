import { Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpParams, HttpResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { RequestConfig } from './request.service';
import { environment } from '@environments/environment';
import { BrowserStorageService, User } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { Capacitor } from '@capacitor/core';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  currenConfig: any;
  constructor(
    private platform: Platform,
    private storage: BrowserStorageService,
    private nativeStorage: NativeStorageService,
    private httpNative: HTTP,
    @Optional() config: RequestConfig,
  ) {
    this.currenConfig = config;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('ipapi.co')) {
      return next.handle(req);
    }
    return fromPromise(this.nativeStorage.getObject('me')).pipe(switchMap((user: User) => {
      const {
        timelineId,
        apikey,
        teamId,
      } = user;

      const headers = {};
      req.headers.keys().forEach(key => {
        headers[key] = req.headers.get(key);
      });
      const paramsInject = req.params;

      // inject appkey
      if (!this.isLoginAPIURL(req) && this.currenConfig.appkey) {
        const appkey = this.currenConfig.appkey;
        headers['appkey'] = appkey;
      }

      if (apikey && !headers['apikey']) {
        headers['apikey'] = apikey;
      }
      if (timelineId) {
        // header value must be string [ES6]
        headers['timelineId'] = timelineId.toString();
      }

      // do not need to pass team id for teams.json
      // do not need to pass team id for chat api calls
      if (teamId && !req.url.includes('/teams.json') &&
      !req.url.includes('/message/chat/list.json') && !req.url.includes('/message/chat/create_message') &&
      !req.url.includes('/message/chat/edit_message') && !req.url.includes('/message/chat/list_messages.json')) {
        headers['teamId'] = teamId.toString();
      }

      // no need to send apikey in hrader for auth.json.
      // in normal login process we didn't have apikey before login.
      // in direct login/ login with apikey we send apikey in request body.
      if (req.url.includes('/auths.json')) {
        delete headers['apikey'];
      }

      if (Capacitor.isNative) {
        return this.handleNativeRequest(req.clone({
          headers: new HttpHeaders(headers),
          params: paramsInject,
        }));
      }

      return next.handle(req.clone({
        headers: new HttpHeaders(headers),
        params: paramsInject,
      }));
    }));
  }

  /**
   * @name reformatNativeParams
   * @description IonicNative http library only accept specific format of url parameter,
   *              and which it's not readily accepting Angular HttpParams instance,
   *              so we need to form a new Params object that match the required format.
   * @param {HttpParams} params
   * @return {[index: string]: string | string[]}
   */
  private reformatNativeParams(params: HttpParams) {
    const keys = params.keys();
    const result = {};
    if (keys.length > 0) {
      keys.forEach(key => {
        let val = params.get(key);
        if (typeof val !== 'string') {
          val = JSON.stringify(val);
        }
        result[key] = val;
      });
    }
    return result;
  }

  private async handleNativeRequest(request: HttpRequest<any>): Promise<HttpResponse<any>> {
    const headerKeys = request.headers.keys();
    const headers = {};

    headerKeys.forEach((key) => {
      headers[key] = request.headers.get(key);
    });

    try {
      await this.platform.ready();

      const method = <HttpMethod> request.method.toLowerCase();

      const nativeHttpResponse = await this.httpNative.sendRequest(request.url, {
        params: this.reformatNativeParams(request.params),
        method: method,
        data: request.body,
        headers: headers,
        serializer: (typeof request.body === 'string') ? 'utf8' : 'json',
      });

      let body;

      try {
        body = JSON.parse(nativeHttpResponse.data);
      } catch (error) {
        body = {
          response: nativeHttpResponse.data
        };
      }

      const response = new HttpResponse({
        body: body,
        status: nativeHttpResponse.status,
        headers: new HttpHeaders(nativeHttpResponse.headers),
        url: nativeHttpResponse.url,
      });

      return Promise.resolve(response);
    } catch (error) {
      if (!error.status) {
        return Promise.reject(error);
      }

      const response = new HttpResponse({
        body: JSON.parse(error.error),
        status: error.status,
        headers: error.headers,
        url: error.url,
      });

      return Promise.reject(response);
    }
  }

  /**
   * sometimes we don't need the automated injected headers/params in the
   *
   * @param   {HttpRequest<any>}  req  [req description]
   *
   * @return  {<any>}                  [return description]
   */
  isLoginAPIURL(req: HttpRequest<any>) {
    if (req.url.includes(environment.loginAPIUrl)) {
      return true;
    }
    return false;
  }
}
