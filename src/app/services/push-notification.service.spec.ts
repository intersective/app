import { TestBed, flush, fakeAsync } from '@angular/core/testing';
import { PushNotificationService, PermissionTypes } from './push-notification.service';
import { RequestService } from '@shared/request/request.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { BrowserStorageService } from '@services/storage.service';
import { environment } from '@environments/environment';
import { NotificationService } from '@shared/notification/notification.service';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  LocalNotificationEnabledResult,
  PushNotificationsPlugin,
  PushNotificationDeliveredList,
  NotificationPermissionResponse,
  Capacitor,
} from '@capacitor/core';
import 'capacitor-pusher-beams';

const { PushNotifications, LocalNotifications, PusherBeams, Permissions } = Plugins;

describe('PushNotificationService', () => {
  let service: PushNotificationService;
  let storageSpy: BrowserStorageService;
  let notificationSpy: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PushNotificationService,
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['set'])
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['dismiss'])
        },
      ]
    });
    service = TestBed.inject(PushNotificationService) as jasmine.SpyObj<PushNotificationService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should initialise some listener altogether', fakeAsync(() => {
    service.requestPermission = jasmine.createSpy('requestPermission');
    service.registerToServer = jasmine.createSpy('registerToServer');
    service.listenToError = jasmine.createSpy('listenToError');
    service.listenToReceiver = jasmine.createSpy('listenToReceiver');
    service.listenToActionPerformed = jasmine.createSpy('listenToActionPerformed');
    service.listenToStateChangeToActive = jasmine.createSpy('listenToStateChangeToActive');

    service.initiatePushNotification().then(() => {
      expect(service.requestPermission).toHaveBeenCalled();
      expect(service.registerToServer).toHaveBeenCalled();
      expect(service.listenToError).toHaveBeenCalled();
      expect(service.listenToReceiver).toHaveBeenCalled();
      expect(service.listenToActionPerformed).toHaveBeenCalled();
      expect(service.listenToStateChangeToActive).toHaveBeenCalled();
    });
    flush();
  }));

  it('should initialise with incoming push notification traffic listener', () => {
    PushNotifications.addListener = jasmine.createSpy('addListener').and.callFake((name, callback) => {
      expect(typeof name).toEqual('string');
      expect(typeof callback).toEqual('function');
    });
    service = new PushNotificationService(storageSpy, notificationSpy);
    service['pushNotificationPlugin'] = PushNotifications;

    service.registerToServer();
    expect(PushNotifications.addListener).toHaveBeenCalled();

    service.listenToError();
    expect(PushNotifications.addListener).toHaveBeenCalled();

    service.listenToReceiver();
    expect(PushNotifications.addListener).toHaveBeenCalled();

    service.listenToActionPerformed();
    expect(PushNotifications.addListener).toHaveBeenCalled();
  });

  describe('hasPermission()', () => {
    beforeEach(() => {
      // Capacitor.isPluginAvailable = () => true;

      /*PushNotifications.requestPermission = (): Promise<NotificationPermissionResponse> => {
        console.log('from spec?');
        return new Promise(resolve => {
          console.log('from specasd?');
          return resolve({ granted: false });
        });
      };*/
    });

    xit('should return true when permission is allowed', fakeAsync(() => {

      /*PushNotifications.requestPermission = jasmine.createSpy('requestPermission').and.returnValue(new Promise(resolve => resolve({
        granted: true
      })));*/
      Permissions.query = () => new Promise(resolve => resolve({
        state: 'granted'
      }));
      PushNotifications.requestPermission = () => new Promise(resolve => resolve({
        granted: true
      }));
      service = new PushNotificationService(storageSpy, notificationSpy);
      service['pushNotificationPlugin'] = PushNotifications;

      service.hasPermission().then(hasPermission => {
        // jasmine is testing from Browser platform,
        // and to the returned "permission" is certainly a "false"
        // capacitor's PushNotification plugin only available on device
        expect(hasPermission).toBeTruthy();
      });
      flush();
    }));

    xit('should return false when permission is disallowed', fakeAsync(() => {
      Permissions.query = () => new Promise(resolve => resolve({
        state: 'denied'
      }));
      PushNotifications.requestPermission = () => new Promise(resolve => resolve({
        granted: false
      }));
      service = new PushNotificationService(storageSpy, notificationSpy);
      service['pushNotificationPlugin'] = PushNotifications;

      service.hasPermission().then(hasPermission => {
        expect(hasPermission).toBeFalsy();
      });
      flush();
    }));
  });

  describe('requestPermission()', () => {
    xit('should register to push notification plugin when permission granted', fakeAsync(() => {

      PushNotifications.requestPermission = jasmine.createSpy('requestPermission').and.returnValue(new Promise(resolve => resolve({
        granted: true
      })));
      PushNotifications.register = jasmine.createSpy();

      service = new PushNotificationService(storageSpy, notificationSpy);
      service['pushNotificationPlugin'] = PushNotifications;
      service.requestPermission().then(() => {
        expect(PushNotifications.requestPermission).toHaveBeenCalled();
        expect(storageSpy.set).toHaveBeenCalled();
        expect(PushNotifications.register).toHaveBeenCalled();
      });
      flush();
    }));
  });

  describe('associateDeviceToUser()', () => {
    xit('should associate user to device', fakeAsync(() => {
      const APPKEY = 'testAppkey';
      const ID = 'testID';
      const TOKEN = 'testToken';

      PusherBeams.setUserID = jasmine.createSpy('setUserID').and.returnValue(new Promise(resolve => resolve(true)));

      environment.appkey = APPKEY;
      service = new PushNotificationService(storageSpy, notificationSpy);
      service['pusherBeams'] = PusherBeams;

      service.associateDeviceToUser(ID, TOKEN).then(res => {
        expect(PusherBeams.setUserID).toHaveBeenCalledWith(jasmine.objectContaining({
            userID: ID,
            headers: {
              appkey: APPKEY,
              apikey: TOKEN,
            },
            beamsAuthURL: environment.lambdaServices.pusherBeamsAuth
        }));
        expect(res).toBeTruthy();
      });
    }));
  });

  describe('promptForPermission()', () => {
    xit('should return false if plugin not available', fakeAsync(() => {
      Capacitor.isPluginAvailable = () => false;
      const snapshot: Partial<RouterStateSnapshot> = {
        url: 'doesNotMatter'
      };
      service.promptForPermission(PermissionTypes.firstVisit, snapshot).then(res => {
        expect(res).toBeFalsy();
      });
      flush();
    }));

    xit('should prompt user for push notification permission', fakeAsync(() => {
      Capacitor.isPluginAvailable = () => true;
      const visited = [
        'url1',
        'url2',
      ];

      storageSpy.get = jasmine.createSpy('get').and.returnValue(visited);

      Permissions.query = () => new Promise(resolve => resolve({
        state: 'granted'
      }));

      PushNotifications.requestPermission = () => new Promise(resolve => resolve({
        granted: true
      }));

      const snapshot: Partial<RouterStateSnapshot> = {
        url: 'url3'
      };

      service = new PushNotificationService(storageSpy, notificationSpy);
      service['pushNotificationPlugin'] = PushNotifications;
      service.promptForPermission(PermissionTypes.firstVisit, snapshot).then(() => {
        expect(storageSpy.set).toHaveBeenCalledWith('visited', [...visited, 'url3']);
      });
      flush();
    }));
  });

  describe('Subscribe to interest(s)', () => {
    describe('subscribeToInterest()', () => {
      xit('should access to pusher beams interest subscription', fakeAsync(() => {
        const INTEREST = 'test-interest';
        PusherBeams.addDeviceInterest = jasmine.createSpy('addDeviceInterest');

        service = new PushNotificationService(storageSpy, notificationSpy);
        service['pusherBeams'] = PusherBeams;

        service.subscribeToInterest(INTEREST);
        expect(PusherBeams.addDeviceInterest).toHaveBeenCalledWith({ interest: INTEREST });

        flush();
      }));
    });

    describe('subscribeToInterests()', () => {
      const INTERESTS = ['1', '2', '3'];

      beforeEach(() => {
        PusherBeams.addDeviceInterest = jasmine.createSpy('addDeviceInterest');
        PusherBeams.setDeviceInterests = jasmine.createSpy('setDeviceInterests');
        service = new PushNotificationService(storageSpy, notificationSpy);
        service['pusherBeams'] = PusherBeams;
      });

      xit('should use back subscribeToInterest() to subcribe to interest', fakeAsync(() => {
        service.subscribeToInterests(INTERESTS);
        // expect(service.subscribeToInterest).toHaveBeenCalledTimes(2);
        expect(PusherBeams.setDeviceInterests).toHaveBeenCalledWith(INTERESTS);
      }));

      xit('should accept single interest subscription', fakeAsync(() => {
        service.subscribeToInterests('single-interest');
        expect(PusherBeams.addDeviceInterest).toHaveBeenCalled();
        expect(PusherBeams.setDeviceInterests).not.toHaveBeenCalled();
      }));
    });

    describe('clearInterest()', () => {
      it('should clearInterest', () => {
        PusherBeams.clearDeviceInterests = jasmine.createSpy('clearDeviceInterests');
        service = new PushNotificationService(storageSpy, notificationSpy);
        service['pusherBeams'] = PusherBeams;
        service.clearInterest();
        expect(PusherBeams.clearDeviceInterests).toHaveBeenCalled();
      });
    });

    describe('getSubscribedInterests()', () => {
      it('should getSubscribedInterests', () => {
        PusherBeams.getDeviceInterests = jasmine.createSpy('getDeviceInterests');
        service = new PushNotificationService(storageSpy, notificationSpy);
        service['pusherBeams'] = PusherBeams;
        service.getSubscribedInterests();
        expect(PusherBeams.getDeviceInterests).toHaveBeenCalled();
      });
    });

    describe('clearPusherBeams()', () => {
      it('should clearPusherBeams', () => {
        PusherBeams.clearAllState = jasmine.createSpy('clearAllState');
        service = new PushNotificationService(storageSpy, notificationSpy);
        service['pusherBeams'] = PusherBeams;
        service.clearPusherBeams();
        expect(PusherBeams.clearAllState).toHaveBeenCalled();
      });
    });

  });
});

