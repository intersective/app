import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthResetPasswordComponent } from './auth-reset-password.component';
import { AuthService } from '../auth.service';
import { Observable, of, pipe, throwError } from 'rxjs';
import { SharedModule } from '@shared/shared.module';
import { Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import { ActivatedRouteStub } from '@testing/activated-route-stub';
import { NotificationService } from '@shared/notification/notification.service';
import { BrowserStorageService } from '@services/storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserStorageServiceMock } from '@testing/mocked.service';
import { UtilsService } from '@app/services/utils.service';
import { TestUtils } from '@testing/utils';

describe('AuthResetPasswordComponent', () => {
  let component: AuthResetPasswordComponent;
  let fixture: ComponentFixture<AuthResetPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, ReactiveFormsModule],
      declarations: [AuthResetPasswordComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        Location,
        {
          provide: LocationStrategy,
          useClass: PathLocationStrategy
        },
        UrlSerializer,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['resetPassword', 'verifyResetPassword'])
        },
        {
          provide: BrowserStorageService,
          useClass: BrowserStorageServiceMock
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['alert', 'presentToast', 'popUp'])
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: of()
          }
        },
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({ apikey: 'abc' })
        },
        {
          provide: UtilsService,
          useClass: TestUtils,
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthResetPasswordComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    routeSpy = TestBed.inject(ActivatedRoute);
    authServiceSpy.resetPassword.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing ngOnInit()', () => {
    it('should pop up alert and redirect if no key or email provided', () => {
      const params = {
        key: null,
        email: 'abc@test.com'
      };
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => params[key]);
      fixture.detectChanges();
      expect(notificationSpy.alert.calls.count()).toBe(1);
      expect(notificationSpy.alert.calls.first().args[0].message).toContain('Invalid');

      const button = notificationSpy.alert.calls.first().args[0].buttons[0];
      (typeof button == 'string') ? button : button.handler(true);

      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login']);
    });
    it('should verify success', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.verifySuccess).toBe(true);
      });
    });
    it('should pop up alert and redirect if verify resetpassword failed', () => {
      authServiceSpy.verifyResetPassword.and.returnValue(throwError(''));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(notificationSpy.alert.calls.count()).toBe(1);
        expect(notificationSpy.alert.calls.first().args[0].message).toContain('Invalid');

        const button = notificationSpy.alert.calls.first().args[0].buttons[0];
        (typeof button == 'string') ? button : button.handler(true);

        expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login']);
      });
    });
  });

  describe('when testing resetPassword()', () => {
    beforeEach(() => {
      component.key = 'abc';
      component.email = 'abc@test.com',
      component.resetPasswordForm.setValue({ email: 'abc@test.com', password: 'aaa', confirmPassword: 'aaa' });
    });
    it('should pop up success and redirect', () => {
      component.resetPassword();
      expect(notificationSpy.alert.calls.count()).toBe(1);
      expect(notificationSpy.alert.calls.first().args[0].message).toContain('successfully');

      const button = notificationSpy.alert.calls.first().args[0].buttons[0];
      (typeof button == 'string') ? button : button.handler(true);

      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login']);
    });

    it('should pop up alert if password compromised', fakeAsync(() => {
      authServiceSpy.resetPassword.and.returnValue(throwError({
        data: { type: 'password_compromised' }
      }));
      component.resetPassword();
      tick();
      expect(notificationSpy.alert.calls.count()).toBe(1);
      expect(notificationSpy.alert.calls.first().args[0].message).toContain('insecure passwords');
    }));

    it('should pop up alert if reset password failed', () => {
      authServiceSpy.resetPassword.and.returnValue(throwError(''));
      component.resetPassword();
      expect(notificationSpy.presentToast.calls.count()).toBe(1);
    });
  });
  describe('when testing checkPasswordMatching()', () => {
    it('should return true if password match', () => {
      component.resetPasswordForm.setValue({ email: 'abc@test.com', password: 'aaa', confirmPassword: 'aaa' });
      expect(component.checkPasswordMatching(component.resetPasswordForm)).toBe(null);
    });
    it('should return false if password not match', () => {
      component.resetPasswordForm.setValue({ email: 'abc@test.com', password: 'aaa', confirmPassword: 'aaaa' });
      expect(component.checkPasswordMatching(component.resetPasswordForm)).toEqual({ notMatching: true });
    });
  });
});

