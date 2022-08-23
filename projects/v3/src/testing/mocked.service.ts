import { of, Observable } from 'rxjs';
import { SpyObject } from './utils';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgZone } from '@angular/core';
import { ProgramFixture } from '@testingv3/fixtures/programs';

export class MockNgZone extends SpyObject {
  run;

  constructor() {
    super(NgZone);
    this.run = this.spy('run').and.returnValue(function(callback) {
      return callback();
    });
  }
}

export class MockRouter extends SpyObject {
  navigate;
  events;
  url;

  constructor() {
    super(Router);
    const TEST_EVENT: NavigationEnd = {
      id: 1,
      url: '/test',
      urlAfterRedirects: 'test/test',
    };

    this.navigate = this.spy('navigate');
    this.events = of(new NavigationEnd(
      TEST_EVENT.id,
      TEST_EVENT.url,
      TEST_EVENT.urlAfterRedirects,
    ));
    this.url = 'abc';
  }
}

export class MockNewRelicService extends SpyObject {
  noticeError;
  actionText;
  createTracer;
  setPageViewName;
  addPageAction;

  constructor() {
    super(NewRelicService);
    this.createTracer = this.spy('createTracer').and.returnValue(() => true);
    this.noticeError = this.spy('noticeError').and.returnValue(true);
    this.actionText = this.spy('actionText').and.returnValue(true);
    this.setPageViewName = this.spy('setPageViewName').and.returnValue(true);
    this.addPageAction = this.spy('addPageAction').and.returnValue(true);
  }
}

export class FastFeedbackServiceMock {
  pullFastFeedback(): Observable<any> {
    return of({
      present: () => {
        return new Promise<any>(resolve => resolve(true));
      },
      onDidDismiss: (data) => {
        return new Promise<any>(resolve => resolve(data));
      }
    });
  }

  fastFeedbackModal() {
    return true;
  }

  getFastFeedback() {
    return;
  }
}

export class BrowserStorageServiceMock extends SpyObject {
  getUser;
  get;
  getConfig;
  set;
  append;
  remove;
  clear;
  setUser;
  memoryCache;
  storage;
  setConfig;
  getCountry;
  singlePageAccess;
  setReferrer;
  setCountry;

  constructor() {
    super(BrowserStorageService);
    const USER = {
      userHash: 'testuserhash',
      enrolment: {
        id: 1,
      },
      apikey: 'test',
      timelineId: 'test',
      teamId: 'test',
      contactNumber: '0123456789',
    };
    this.getUser = this.spy('getUser').and.returnValue(USER);
    this.setUser = this.spy('setUser').and.returnValue(true);
    this.setCountry = this.spy('setCountry');
    this.get = this.spy('get').and.returnValue(true);
    this.set = this.spy('set').and.returnValue(true);
    this.remove = this.spy('remove').and.returnValue(true);
    this.getCountry = this.spy('getCountry').and.returnValue('Australia');
    this.getConfig = this.spy('getConfig').and.returnValue({
      logo: '',
    });
    this.singlePageAccess = this.spy('singlePageAccess');
    this.setReferrer = this.spy('setReferrer').and.returnValue(true);
  }

  getProviders(): Array<any> {
    return [{ provide: BrowserStorageService, useValue: this }];
  }
}
