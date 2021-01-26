import { Injectable, Optional, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpParameterCodec } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, tap, concatMap, map } from 'rxjs/operators';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { environment } from '@environments/environment';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class DevModeService {
  isDevMode() {
    return isDevMode();
  }
}

export class RequestConfig {
  appkey = '';
  prefixUrl = '';
}

export class QueryEncoder implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string): string {
    return decodeURIComponent(v);
  }
}

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private appkey: string;
  private prefixUrl: string;
  private loggedOut: boolean;

  constructor(
    private httpClient: HttpClient,
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private nativeStorage: NativeStorageService,
    private router: Router,
    @Optional() config: RequestConfig,
    private newrelic: NewRelicService,
    private devMode: DevModeService,
    private apollo: Apollo
  ) {
    if (config) {
      this.appkey = config.appkey;
      this.prefixUrl = config.prefixUrl;
    }
  }

  internalErrorCheck = false;

  /**
   *
   * @param {'Content-Type': string } header
   * @returns {HttpHeaders}
   */
  appendHeaders(header = {}): HttpHeaders {
    return new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, header));
  }

  /**
   *
   * @param options
   * @returns {any}
   */
  setParams(options): HttpParams {
    let params: HttpParams;
    if (!this.utils.isEmpty(options)) {
      params = new HttpParams();
      this.utils.each(options, (value, key) => {
        params = params.append(key, value);
      });
    }
    return params;
  }

  private getEndpointUrl(endpoint): string {
    let endpointUrl = this.prefixUrl + endpoint;
    if (endpoint.includes('https://') || endpoint.includes('http://')) {
      endpointUrl = endpoint;
    }

    return endpointUrl;
  }

  /**
   *
   * @param {string} endPoint
   * @param options
   * @param headers
   * @returns {Observable<any>}
   */
  get(endPoint: string = '', httpOptions?: any): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }

    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }

    let request = this.httpClient.get<any>(this.getEndpointUrl(endPoint), {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    });

    return request
      .pipe(concatMap(response => {
        this._refreshApikey(response);
        return of(response);
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  post(endPoint: string = '', data: string | object, httpOptions?: any): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }

    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }


    let request = this.httpClient.post<any>(this.getEndpointUrl(endPoint), data, {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    });

    return request
      .pipe(concatMap(response => {
        this._refreshApikey(response);
        return of(response);
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Valid options:
   * noCache: Boolean default false. If set to false, will not cache the result
   */
  graphQLQuery(query: string, variables?: any, options?: any): Observable<any> {
    options = {...{ noCache: false }, ...options};
    const watch = this.apollo.watchQuery({
      query: gql(query),
      variables: variables || {},
      fetchPolicy: options.noCache ? 'no-cache' : 'cache-and-network'
    });
    return watch.valueChanges
      .pipe(map(response => {
        this._refreshApikey(response);
        return response;
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  /**
   *
   */
  graphQLMutate(query: string, variables = {}): Observable<any> {
    return this.apollo.mutate({
      mutation: gql(query),
      variables: variables
    })
      .pipe(
        concatMap(response => {
          this._refreshApikey(response);
          return of(response);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  delete(endPoint: string = '', httpOptions?: any): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }
    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }

    let request = this.httpClient.delete<any>(this.getEndpointUrl(endPoint), {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    });

    return request
      .pipe(concatMap(response => {
        this._refreshApikey(response);
        return of(response);
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  /**
   *
   * @returns {string}
   */
  public getPrefixUrl() {
    return this.prefixUrl;
  }

  /**
   *
   * @returns {string}
   */
  public getAppkey() {
    return this.appkey;
  }

  public apiResponseFormatError(msg = '') {
    console.error('API response format error.\n' + msg);
    return;
  }

  public hideChatTab () {
    return !this.internalErrorCheck;
  }

  private handleError(error: HttpErrorResponse | any) {
    if (this.devMode.isDevMode()) {
      const errorMessage = error.message || error;
      console.error(errorMessage); // log to console instead
      if (error.status === 500 && error.url.includes('chat')) {
        this.hideChatTab();
      }
    }

    // log the user out if jwt expired
    if (this.utils.has(error, 'error.message') && [
      'Request must contain an apikey',
      'Expired apikey',
      'Invalid apikey'
    ].includes(error.error.message) && !this.loggedOut) {
      // in case lots of api returns the same apikey invalid at the same time
      this.loggedOut = true;
      setTimeout(
        () => {
          this.loggedOut = false;
        },
        2000
      );
      this.router.navigate(['logout']);
    }
    this.newrelic.noticeError(error);
    // if error.error is a html template error (when try to read remote version.txt)
    if (typeof error.error === 'string' && error.error.indexOf('<!DOCTYPE html>') !== -1) {
      return throwError(error.message);
    }
    if (error.error) {
      return throwError(error.error);
    }
    if (error.graphQLErrors) {
      return throwError(error.graphQLErrors[0]);
    }
    return throwError(error);
  }

  /**
   * Refresh the apikey (JWT token) if API returns it
   *
   */
  private _refreshApikey(response) {
    if (this.utils.has(response, 'apikey')) {
      this.storage.setUser({apikey: response.apikey});
      this.nativeStorage.setObject('me', {apikey: response.apikey});
    }
  }
}
