import { Injectable, Optional, isDevMode } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpParameterCodec,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { ApolloService } from '@shared/apollo/apollo.service';

interface RequestOptions {
  headers?: any;
  params?: any;
}

@Injectable({ providedIn: 'root' })
export class DevModeService {
  isDevMode() {
    return isDevMode();
  }
}

export class RequestConfig {
  appkey = '';
  loginApiUrl = '';
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
  private loginApiUrl: string;
  private loggedOut: boolean;

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private router: Router,
    @Optional() config: RequestConfig,
    private newrelic: NewRelicService,
    private devMode: DevModeService,
    private apolloService: ApolloService
  ) {
    if (config) {
      this.appkey = config.appkey;
      this.loginApiUrl = config.loginApiUrl;
    }
  }

  /**
   *
   * @param {'Content-Type': string } header
   * @returns {HttpHeaders}
   */
  appendHeaders(header = {}) {
    const headers = new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, header));
    return headers;
  }

  /**
   *
   * @param options
   * @returns {any}
   */
  setParams(options) {
    let params: any;
    if (!this.utils.isEmpty(options)) {
      params = new HttpParams();
      this.utils.each(options, (value, key) => {
        params = params.append(key, value);
      });
    }
    return params;
  }

  private getEndpointUrl(endpoint, isLoginAPI?: boolean) {
    let endpointUrl = '';
    if (isLoginAPI) {
      endpointUrl = this.utils.urlFormatter(this.loginApiUrl, endpoint);
    } else if (this.storage.stackConfig && this.storage.stackConfig.coreApi) {
      endpointUrl = this.utils.urlFormatter(this.storage.stackConfig.coreApi, endpoint);
    } else {
      throw new Error('Can not find API URL.');
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
  get(endPoint: string = '', httpOptions?: RequestOptions, isLoginAPI?: boolean): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }

    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }

    let apiEndpoint = '';
    // get login API endpoint if need to call login API.
    if (isLoginAPI) {
      apiEndpoint = this.getEndpointUrl(endPoint, true);
    } else {
      apiEndpoint = this.getEndpointUrl(endPoint);
    }
    return this.http.get<any>(apiEndpoint, {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    })
      .pipe(concatMap(response => {
        this._refreshApikey(response);
        return of(response);
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  post(endPoint: string = '', data, httpOptions?: RequestOptions, isLoginAPI?: boolean): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }

    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }

    let apiEndpoint = '';
    // get login API endpoint if need to call login API.
    if (isLoginAPI) {
      apiEndpoint = this.getEndpointUrl(endPoint, true);
    } else {
      apiEndpoint = this.getEndpointUrl(endPoint);
    }

    return this.http.post<any>(apiEndpoint, data, {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    })
      .pipe(concatMap(response => {
        this._refreshApikey(response);
        return of(response);
      }))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  put(endPoint: string = '', data, httpOptions?: any, isLoginAPI?: boolean): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }

    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }

    let apiEndpoint = '';
    // get login API endpoint if need to call login API.
    if (isLoginAPI) {
      apiEndpoint = this.getEndpointUrl(endPoint, true);
    } else {
      apiEndpoint = this.getEndpointUrl(endPoint);
    }

    return this.http.put<any>(apiEndpoint, data, {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    })
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
    const watch = this.apolloService.graphQLQuery(query, variables, options);
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
   * @todo: graphQLMutate docsblocks
   */
  graphQLMutate(query: string, variables = {}): Observable<any> {
    return this.apolloService.graphQLMutate(query, variables)
      .pipe(
        concatMap(response => {
          this._refreshApikey(response);
          return of(response);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Valid options:
   * noCache: Boolean default false. If set to false, will not cache the result
   */
  chatGraphQLQuery(query: string, variables?: any, options?: any): Observable<any> {
    options = {...{ noCache: false }, ...options};
    const watch = this.apolloService.chatGraphQLQuery(query, variables, options);
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
  chatGraphQLMutate(query: string, variables = {}): Observable<any> {
    return this.apolloService.chatGraphQLMutate(query, variables).pipe(
      concatMap(response => {
        return of(response);
      }),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   *
   */
  delete(endPoint: string = '', httpOptions?: RequestOptions): Observable<any> {
    if (!httpOptions) {
      httpOptions = {};
    }
    if (!this.utils.has(httpOptions, 'headers')) {
      httpOptions.headers = '';
    }
    if (!this.utils.has(httpOptions, 'params')) {
      httpOptions.params = '';
    }
    return this.http.delete<any>(this.getEndpointUrl(endPoint), {
      headers: this.appendHeaders(httpOptions.headers),
      params: this.setParams(httpOptions.params)
    })
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
  public getAppkey(): string {
    return this.appkey;
  }

  public apiResponseFormatError(msg = '') {
    console.error('API response format error.\n' + msg);
    return;
  }

  private handleError(error: HttpErrorResponse | any) {
    if (this.devMode.isDevMode()) {
      console.error(error); // log to console instead
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
    }
  }
}
