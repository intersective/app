import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLoginComponent } from './auth-login.component';
import { AuthService } from '@v3/services/auth.service';
import { ExperienceService } from '@v3/services/experience.service';
import { Router } from '@angular/router';
import { Observable, of, pipe, throwError } from 'rxjs';
import { NotificationsService } from '@v3/services/notifications.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from '@v3/services/utils.service';
import { TestUtils } from '@testingv3/utils';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;
  let notificationSpy: jasmine.SpyObj<NotificationsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let experienceServiceSpy: jasmine.SpyObj<ExperienceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ AuthLoginComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['login'])
        },
        {
          provide: NotificationsService,
          useValue: jasmine.createSpyObj('NotificationsService', ['alert'])
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: of(),
            routerState: {root: {}}
          }
        },
        {
          provide: ExperienceService,
          useValue: jasmine.createSpyObj('ExperienceService', ['switchProgramAndNavigate'])
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    experienceServiceSpy = TestBed.inject(ExperienceService) as jasmine.SpyObj<ExperienceService>;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing login()', () => {
    it('should pop up alert if email is empty', () => {
      component.loginForm.setValue({email: '', password: 'abc'});
      notificationSpy.alert.and.returnValue(Promise.resolve());
      component.login();
      expect(notificationSpy.alert.calls.count()).toBe(1);

      const button = notificationSpy.alert.calls.first().args[0].buttons[0];
      (typeof button == 'string') ? button : button.handler(true);

      expect(component.isLoggingIn).toBe(false);
    });

    it('should navigate to dashboard if have one program after successfully login', fakeAsync(() => {
      experienceServiceSpy.switchProgramAndNavigate.and.returnValue(Promise.resolve(['v3', 'home']));
      component.loginForm.setValue({email: 'test@test.com', password: 'abc'});
      serviceSpy.login.and.returnValue(of({}));
      component.login();
      tick();
      expect(serviceSpy.login.calls.count()).toBe(1);
      expect(experienceServiceSpy.switchProgramAndNavigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['v3', 'home']);
    }));

    it('should pop up password compromised alert if login failed', fakeAsync(() => {
      component.loginForm.setValue({email: 'test@test.com', password: 'abc'});
      serviceSpy.login.and.returnValue(throwError({data: {type: 'password_compromised'}}));
      component.login();
      tick();
      expect(serviceSpy.login.calls.count()).toBe(1);
      expect(component.isLoggingIn).toBe(false);
      expect(notificationSpy.alert.calls.count()).toBe(1);
      expect(notificationSpy.alert.calls.first().args[0].message).toContain('insecure passwords');
    }));

    it(`should pop up 'incorrect' alert if login failed`, fakeAsync(() => {
      component.loginForm.setValue({email: 'test@test.com', password: 'abc'});
      serviceSpy.login.and.returnValue(throwError({}));
      component.login();
      tick();
      expect(serviceSpy.login.calls.count()).toBe(1);
      expect(component.isLoggingIn).toBe(true);
      expect(notificationSpy.alert.calls.count()).toBe(1);
      expect(notificationSpy.alert.calls.first().args[0].message).toContain('password is incorrect');

      const button = notificationSpy.alert.calls.first().args[0].buttons[0];
      (typeof button == 'string') ? button : button.handler(true);

      expect(component.isLoggingIn).toBe(false);
    }));
  });
});

