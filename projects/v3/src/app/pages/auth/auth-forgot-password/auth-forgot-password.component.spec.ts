import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthForgotPasswordComponent } from './auth-forgot-password.component';
import { AuthService } from '@v3/services/auth.service';
import { Observable, of, pipe, throwError } from 'rxjs';
import { UtilsService } from '@v3/services/utils.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtils } from '@testingv3/utils';

describe('AuthForgotPasswordComponent', () => {
  let component: AuthForgotPasswordComponent;
  let fixture: ComponentFixture<AuthForgotPasswordComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;
  let utils: UtilsService;
  let notificationSpy: jasmine.SpyObj<NotificationsService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AuthForgotPasswordComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['forgotPassword'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['get', 'getConfig', 'getUser'])
        },
        {
          provide: NotificationsService,
          useValue: jasmine.createSpyObj('NotificationsService', ['alert', 'presentToast', 'popUp'])
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthForgotPasswordComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    utils = TestBed.inject(UtilsService);
    notificationSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    storageSpy.getConfig.and.returnValue({ logo: null });
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing send()', () => {

    beforeEach(() => {
      component.email = 'test@test.com';
    });

    it('should pop up toast message if email is empty', fakeAsync(() => {
      notificationSpy.presentToast.and.returnValue(Promise.resolve());
      component.email = '';
      component.send();
      expect(notificationSpy.presentToast.calls.count()).toBe(1);
    }));

    it('should pop up forgot password confirmation if success', fakeAsync(() => {
      serviceSpy.forgotPassword.and.returnValue(of({}));
      component.send();
      tick();

      expect(component.isSending).toBe(false);
      expect(notificationSpy.popUp.calls.count()).toBe(1);
      expect(notificationSpy.popUp.calls.first().args[1]).toEqual({ email: component.email });
    }));

    it('should pop up reset too frequently alert if forgot password failed', fakeAsync(() => {
      serviceSpy.forgotPassword.and.returnValue(throwError({
        data: {
          type: 'reset_too_frequently'
        }
      }));
      component.send();
      tick();
      expect(component.isSending).toBe(false);
      expect(notificationSpy.alert.calls.count()).toBe(1);
    }));

    it('should pop up try again alert if forgot password failed', fakeAsync(() => {
      serviceSpy.forgotPassword.and.returnValue(throwError({}));
      component.send();
      tick();
      expect(component.isSending).toBe(false);
      expect(notificationSpy.presentToast.calls.count()).toBe(1);
    }));
  });
});

