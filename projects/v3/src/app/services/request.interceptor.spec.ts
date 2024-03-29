import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RequestModule } from 'request';
import { RequestInterceptor } from './request.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserStorageService } from '@v3/services/storage.service';

import { Router } from '@angular/router';
import { TestUtils } from '@testingv3/utils';
import { BrowserStorageServiceMock } from '@testingv3/mocked.service';
import { RequestService } from 'request';

describe('RequestInterceptor', () => {
  const APPKEY = 'TEST';
  const routerSpy = TestUtils.createRouterSpy();
  let service: RequestService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let storageSpy: BrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RequestModule.forRoot({
          appkey: APPKEY,
          prefixUrl: 'test.com'
        })
      ],
      providers: [
        HttpClient,
        {
          provide: Router,
          useValue: routerSpy
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true,
        },
        {
          provide: BrowserStorageService,
          useClass: BrowserStorageServiceMock
        }
      ]
    });

    service = TestBed.inject(RequestService);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    storageSpy = TestBed.inject(BrowserStorageService);
  });

  beforeEach(fakeAsync(() => {
    service.get('/test').subscribe(_res => {
      expect(_res).toBeTruthy();
    });
    tick();
  }));

  it('should has Authentication injected into HTTP header', () => {
    const req = httpMock.expectOne({ method: 'GET' });
    expect(req.request.headers.has('appkey')).toEqual(true);
  });

  it('should return APPKEY as provided in RequestConfig', () => {
    const req = httpMock.expectOne({ method: 'GET' });
    expect(req.request.headers.get('appkey')).toBe(APPKEY);
  });

  it('should return appkey & apikey & timelineId as provided in RequestConfig', () => {
    const req = httpMock.expectOne({ method: 'GET' });
    expect(req.request.headers.get('appkey')).toBe(APPKEY);
  });

  it('should return teamid when it\'s not in chat-related & team-list page view', fakeAsync(() => {
    const req = httpMock.expectOne({ method: 'GET' });
    req.flush({});

    expect(storageSpy.getUser).toHaveBeenCalled();
    expect(req.request.url).not.toContain('/message/chat/list.json');
    expect(req.request.url).not.toContain('/message/chat/create_message');
    expect(req.request.url).not.toContain('/message/chat/edit_message');
    expect(req.request.url).not.toContain('/message/chat/list_messages.json');
    expect(req.request.url).not.toContain('/teams.json');
    expect(req.request.headers.get('teamId')).toBe('test');
  }));

  it('should not return teamId when url contains teams.json', fakeAsync(() => {
    const URL = 'https://test.com/teams.json';
    http.get(URL).subscribe(_res => {
      expect(_res).toBeTruthy();
    });
    tick();

    const req = httpMock.expectOne({
      url: URL,
      method: 'GET'
    });

    expect(req.request.url).toContain('/teams.json');
    expect(req.request.headers.get('teamId')).toBe(null);
  }));

});
