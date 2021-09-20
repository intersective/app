import { AuthService } from './auth.service';
import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { TestUtils } from '@testing/utils';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserStorageService } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { UtilsService } from '@services/utils.service';
import { MockStacks } from '@testing/fixtures/stacks';
import { NativeStorageServiceMock } from '@testing/mocked.service';
import { PushNotificationService } from '@services/push-notification.service';

describe('AuthService', () => {
  let service: AuthService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorageService>;
  let pusherSpy: jasmine.SpyObj<PusherService>;
  let utilsSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['delete', 'post', 'get', 'put', 'graphQLQuery'])
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: of()
          }
        },
        {
          provide: NativeStorageService,
          useClass: NativeStorageServiceMock
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['setUser', 'getUser', 'set', 'getConfig', 'setConfig', 'get', 'clear'])
        },
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', ['has', 'changeThemeColor', 'openUrl'])
        },
        {
          provide: PusherService,
          useValue: jasmine.createSpyObj('PusherService', ['unsubscribeChannels', 'disconnect'])
        },
        {
          provide: PushNotificationService,
          useValue: jasmine.createSpyObj('PushNotificationService', ['clearInterest'])
        },
      ]
    });
    service = TestBed.inject(AuthService);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    nativeStorageSpy = TestBed.inject(NativeStorageService) as jasmine.SpyObj<NativeStorageService>;
    pusherSpy = TestBed.inject(PusherService) as jasmine.SpyObj<PusherService>;
    utilsSpy = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockStacks = MockStacks;

  const mockOneStack = {
    uuid: 'b0f6328e-379c-4cd2-9e96-1363a49ab001',
    name: 'Practera Classic App - Stage',
    description: 'Participate in an experience as a learner or reviewer - Testing',
    image: 'https://media.intersective.com/img/learners_reviewers.png',
    url: 'https://app.p1-stage.practera.com',
    type: 'app',
    coreApi: 'https://admin.p1-stage.practera.com',
    coreGraphQLApi: 'https://core-graphql-api.p1-stage.practera.com',
    chatApi: 'https://chat-api.p1-stage.practera.com',
    filestack: {
      s3Config: {
        container: 'files.p1-stage.practera.com',
        region: 'ap-southeast-2'
      },
    },
    defaultCountryModel: 'AUS',
    lastLogin: 1619660600368
  };

  it('when testing login(), it should pass the correct data to API', fakeAsync(() => {
    requestSpy.post.and.returnValue(of({
      success: true,
      data: {
        // tutorial: null,
        apikey: '123456',
        stacks: mockStacks,
      }
    }));
    service.login({ username: 'test@test.com', password: '123' }).subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
    expect(requestSpy.post.calls.first().args[0].data.username).toEqual('test@test.com');
    expect(requestSpy.post.calls.first().args[0].data.password).toEqual('123');
    expect(requestSpy.post.calls.first().args[0].data.from).toEqual('App');
    expect(requestSpy.post.calls.first().args[1]).toContain('test%40test.com');
    expect(requestSpy.post.calls.first().args[1]).toContain('123');

    tick();

    expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('me', {apikey: '123456'});
    expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('isLoggedIn', {isLoggedIn: true});
    expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('programs', [ {
      enrolment: {  },
      program: { config: { theme_color: 'abc' } },
      project: {  },
      timeline: {  },
      experience: { }
    } ]);
  }));

  it('when testing directLogin(), it should pass the correct data to API', fakeAsync(() => {
    requestSpy.post.and.returnValue(of({
      success: true,
      data: {
        tutorial: null,
        apikey: '123456',
        Timelines: [
          {
            Program: {
              config: {
                theme_color: 'abc'
              }
            },
            Enrolment: {},
            Project: {},
            Timeline: {}
          }
        ]
      }
    }));

    service.logout = jasmine.createSpy().and.returnValue(true);
    nativeStorageSpy.getObject.and.returnValue(Promise.resolve(true));
    const direction = service.directLogin({ authToken: 'abcd' });
    direction.then(res => {
      res.subscribe(login => {
        expect(requestSpy.post.calls.count()).toBe(1);
        expect(requestSpy.post.calls.first().args[1]).toContain('abcd');
        expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('me', {apikey: '123456'});
      });
    });
    flush();
  }));

  it('when testing directLoginWithApikey(), it should pass the correct data to API', () => {
    requestSpy.post.and.returnValue(of({
      success: true,
      data: {
        tutorial: null,
        apikey: '123456',
        Timelines: [
          {
            Program: {
              config: {
                theme_color: 'abc'
              }
            },
            Enrolment: {},
            Project: {},
            Timeline: {}
          }
        ]
      }
    }));
    storageSpy.getConfig.and.returnValue(true);
    service.directLoginWithApikey({ apikey: 'abcd', service: 'LOGIN' }).subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
    expect(requestSpy.post.calls.first().args[0].data).toContain('abcd');
    expect(storageSpy.setUser.calls.first().args[0]).toEqual({apikey: '123456'});
  });

  describe('when testing isAuthenticated()', () => {
    it('should return true', fakeAsync(() => {
      nativeStorageSpy.getObject.and.returnValue(Promise.resolve({
        isLoggedIn: true
      }));
      service.isAuthenticated().then(authenticated => {
        expect(nativeStorageSpy.getObject).toHaveBeenCalledWith('isLoggedIn');
        expect(authenticated).toEqual(true);
      });
      flush();
    }));

    it('should return false', fakeAsync(() => {
      nativeStorageSpy.getObject.and.returnValue(Promise.resolve({
        isLoggedIn: false
      }));
      service.isAuthenticated().then(authenticated => {
        expect(nativeStorageSpy.getObject).toHaveBeenCalledWith('isLoggedIn');
        expect(authenticated).toEqual(false);
      });
      flush();
    }));
  });

  describe('when testing logout()', () => {
    it('should navigate to login by default', fakeAsync(() => {
      nativeStorageSpy.getObject.and.returnValue(Promise.resolve({ color: '' }));
      service.logout({});
      tick();
      expect(pusherSpy.unsubscribeChannels.calls.count()).toBe(1);
      expect(pusherSpy.disconnect.calls.count()).toBe(1);
      expect(nativeStorageSpy.getObject).toHaveBeenCalledWith('config');
      expect(nativeStorageSpy.setObject).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login']);
    }));

    it('should pass navigation data', fakeAsync(() => {
      const logoutData = { data: 'data' };
      nativeStorageSpy.getObject.and.returnValue(Promise.resolve({color: ''}));
      service.logout(logoutData);
      tick();
      expect(pusherSpy.unsubscribeChannels.calls.count()).toBe(1);
      expect(pusherSpy.disconnect.calls.count()).toBe(1);
      expect(storageSpy.clear.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login'], { data: 'data' });
      expect(nativeStorageSpy.clear).toHaveBeenCalledTimes(1);
      expect(nativeStorageSpy.getObject).toHaveBeenCalledWith('config');
      expect(nativeStorageSpy.setObject).toHaveBeenCalledTimes(1);
      expect(routerSpy.navigate.calls.first().args[1]).toEqual(logoutData);
    }));

    it('should not navigate to login when it is called with redirect = false', () => {
      storageSpy.getConfig.and.returnValue({color: ''});
      service.logout({}, false);
      expect(routerSpy.navigate.calls.count()).toBe(0);
    });
  });

  it('when testing forgotPassword()', () => {
    requestSpy.post.and.returnValue(of(''));
    service.forgotPassword('test@test.com').subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
    expect(requestSpy.post.calls.first().args[0].data.email).toEqual('test@test.com');
  });

  it('when testing resetPassword()', () => {
    requestSpy.put.and.returnValue(of(''));
    service.resetPassword({ password: 'abc' }, { apikey: '1234' }).subscribe();
    expect(requestSpy.put.calls.count()).toBe(1);
  });

  describe('when testing contactNumberLogin()', () => {
    it('should set correct data to local storage', fakeAsync(() => {
      const apikey = 'aaa';
      requestSpy.post.and.returnValue(of({
        data: {
          apikey,
          tutorial: false,
          timelines: []
        }
      }));
      service.contactNumberLogin({ contactNumber: '123' }).subscribe();
      tick();
      expect(requestSpy.post).toHaveBeenCalledTimes(1);
      expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('me', {apikey: apikey});
      expect(nativeStorageSpy.setObject).toHaveBeenCalledTimes(2);
    }));

    it('should not set data if response format incorrect', fakeAsync(() => {
      requestSpy.post.and.returnValue(of({}));
      service.contactNumberLogin({ contactNumber: '123' }).subscribe();
      tick();
      expect(requestSpy.post).toHaveBeenCalledTimes(1);
      expect(nativeStorageSpy.setObject).toHaveBeenCalledTimes(0);
    }));
  });

  it('when testing checkDomain()', () => {
    requestSpy.get.and.returnValue(of(''));
    service.checkDomain({domain: 'localhost'}).subscribe();
    expect(requestSpy.get.calls.count()).toBe(1);
  });

  it('when testing updateProfile()', () => {
    requestSpy.post.and.returnValue(of(''));
    service.updateProfile({ contactNumber: '124' }).subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
  });

  it('when testing saveRegistration()', () => {
    requestSpy.post.and.returnValue(of(''));
    service.saveRegistration({ user_id: 1, password: '123', key: 'key' }).subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
  });

  it('when testing verifyRegistration()', () => {
    requestSpy.post.and.returnValue(of(''));
    service.verifyRegistration({ email: 'test@test.com', key: 'key' }).subscribe();
    expect(requestSpy.post.calls.count()).toBe(1);
  });

  describe('getUUID()', function () {
    it('should get user uuid in string', () => {
      const UUID = 'SAMPLE-UUID';
      requestSpy.graphQLQuery.and.returnValue(of({
        data: {
          user: {
            uuid: UUID
          }
        }
      }));
      service.getUUID().subscribe(result => {
        expect(result).toBe(UUID);
      });
    });

    it('should return null when data object is undefined', () => {
      requestSpy.graphQLQuery.and.returnValue(of({
        data: undefined
      }));
      service.getUUID().subscribe(result => {
        expect(result).toBeNull();
      });
    });
  });

  describe('getStackConfig()', () => {
    const sample_uuid = 'abcdefg_hijklmn_opqrstu_vwxyz';
    it('should make GET request to LoginAPI', () => {
      const sample_result: any = {
        data: {
          sample_result: sample_uuid
        }
      };
      requestSpy.get.and.returnValue(of(sample_result));
      service.getStackConfig(sample_uuid).subscribe(result => {

        expect(result).toEqual(sample_result);
        expect(requestSpy.get).toHaveBeenCalledWith('stack', {
          params: {
            uuid: sample_uuid
          }
        },                                          true);
      });
    });

    it('should fail with returning null', () => {
      requestSpy.get.and.returnValue(of(null));
      service.getStackConfig(sample_uuid).subscribe(result => {
        expect(result).toBeFalsy();
        expect(requestSpy.get).toHaveBeenCalledWith('stack', {params: {uuid: sample_uuid}}, true);
      });
    });
  });
});

