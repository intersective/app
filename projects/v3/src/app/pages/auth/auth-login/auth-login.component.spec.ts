import { CUSTOM_ELEMENTS_SCHEMA, Directive, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of, throwError } from 'rxjs';

import { AuthService } from '@v3/services/auth.service';
import { ExperienceService } from '@v3/services/experience.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { UtilsService } from '@v3/services/utils.service';

import { AuthLoginComponent } from './auth-login.component';

@Directive({
  standalone: false,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ion-input[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonInputValueAccessorStub),
      multi: true,
    },
  ],
})
class IonInputValueAccessorStub implements ControlValueAccessor {
  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let authService: jasmine.SpyObj<AuthService>;
  let experienceService: jasmine.SpyObj<ExperienceService>;
  let notificationsService: jasmine.SpyObj<NotificationsService>;
  let router: jasmine.SpyObj<Router>;
  let utils: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['deprecatingLogin']);
    experienceService = jasmine.createSpyObj<ExperienceService>('ExperienceService', ['switchProgram']);
    notificationsService = jasmine.createSpyObj<NotificationsService>('NotificationsService', ['alert']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    utils = jasmine.createSpyObj<UtilsService>('UtilsService', ['setPageTitle', 'isEmpty', 'has']);
    utils.isEmpty.and.callFake(value => value === null || value === undefined || value === '');
    utils.has.and.callFake((value: any, path: string) =>
      path === 'data.type' && value?.data?.type !== undefined
    );
    authService.deprecatingLogin.and.returnValue(EMPTY);
    component = new AuthLoginComponent(
      router,
      authService,
      notificationsService,
      utils,
      experienceService
    );
  });

  it('should create a required email and password form', () => {
    expect(component.loginForm.valid).toBeFalse();

    component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });

    expect(component.loginForm.valid).toBeTrue();
  });

  it('should set the login page title on initialization', () => {
    component.ngOnInit();

    expect(utils.setPageTitle).toHaveBeenCalledWith('Login - Practera');
  });

  [
    { label: 'email', credentials: { email: '', password: 'secret' } },
    { label: 'password', credentials: { email: 'learner@example.com', password: '' } },
  ].forEach(({ label, credentials }) => {
    it(`should alert and stop when the ${label} is empty`, () => {
      component.loginForm.setValue(credentials);
      component.isLoggingIn = true;

      component.login();

      expect(authService.deprecatingLogin).not.toHaveBeenCalled();
      expect(notificationsService.alert).toHaveBeenCalledWith(jasmine.objectContaining({
        message: 'Your email or password is empty, please fill them in.',
      }));
      const button = notificationsService.alert.calls.mostRecent().args[0].buttons[0] as any;
      button.handler();
      expect(component.isLoggingIn).toBe(false);
    });
  });

  ['Enter', 'Space'].forEach(code => {
    it(`should prevent the default ${code} action and attempt login`, () => {
      component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
      const event = new KeyboardEvent('keydown', { code });
      spyOn(event, 'preventDefault');

      component.login(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(authService.deprecatingLogin).toHaveBeenCalledWith({
        email: 'learner@example.com',
        password: 'secret',
      });
    });
  });

  it('should ignore unrelated keyboard events', () => {
    component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
    const event = new KeyboardEvent('keydown', { code: 'Escape' });

    component.login(event);

    expect(authService.deprecatingLogin).not.toHaveBeenCalled();
    expect(notificationsService.alert).not.toHaveBeenCalled();
  });

  it('should switch program, reset the form, and navigate home after login', async () => {
    const authResponse = {
      data: {
        auth: {
          apikey: 'api-key',
          experience: { id: 1, name: 'Program' },
        },
      },
    };
    component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
    authService.deprecatingLogin.and.returnValue(of(authResponse));
    experienceService.switchProgram.and.resolveTo();
    router.navigate.and.resolveTo(true);

    component.login();
    await Promise.resolve();
    await Promise.resolve();

    expect(experienceService.switchProgram).toHaveBeenCalledWith(authResponse);
    expect(component.loginForm.value).toEqual({ email: null, password: null });
    expect(component.isLoggingIn).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['v3', 'home']);
  });

  it('should alert when program data cannot be loaded after login', async () => {
    const error = new Error('Program unavailable');
    component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
    authService.deprecatingLogin.and.returnValue(of({ data: { auth: {} } }));
    experienceService.switchProgram.and.rejectWith(error);
    const consoleErrorSpy = spyOn(console, 'error');

    component.login();
    await Promise.resolve();
    await Promise.resolve();

    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(notificationsService.alert).toHaveBeenCalledWith(jasmine.objectContaining({
      message: jasmine.stringMatching(/difficulties in fetching your program data/),
    }));
  });

  it('should show the compromised-password warning and stop logging in', () => {
    component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
    authService.deprecatingLogin.and.returnValue(throwError(() => ({
      data: { type: 'password_compromised' },
    })));

    component.login();

    expect(component.isLoggingIn).toBeFalse();
    expect(notificationsService.alert).toHaveBeenCalledTimes(1);
    expect(notificationsService.alert.calls.first().args[0].message).toContain('insecure passwords');
  });

  [
    { label: 'untyped error', error: {} },
    { label: 'non-password error', error: { data: { type: 'account_locked' } } },
  ].forEach(({ label, error }) => {
    it(`should show the incorrect-credentials alert for a ${label}`, () => {
      component.loginForm.setValue({ email: 'learner@example.com', password: 'secret' });
      authService.deprecatingLogin.and.returnValue(throwError(() => error));

      component.login();

      expect(component.isLoggingIn).toBeTrue();
      expect(notificationsService.alert).toHaveBeenCalledWith(jasmine.objectContaining({
        message: 'Your email or password is incorrect, please try again.',
      }));
      const button = notificationsService.alert.calls.mostRecent().args[0].buttons[0] as any;
      button.handler();
      expect(component.isLoggingIn).toBeFalse();
    });
  });

  describe('template keyboard activation', () => {
    let fixture: ComponentFixture<AuthLoginComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [AuthLoginComponent, IonInputValueAccessorStub],
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          { provide: AuthService, useValue: authService },
          { provide: NotificationsService, useValue: notificationsService },
          { provide: UtilsService, useValue: utils },
          { provide: ExperienceService, useValue: experienceService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AuthLoginComponent);
      component = fixture.componentInstance;
      component.loginForm.setValue({
        email: 'learner@example.com',
        password: 'secret',
      });
      fixture.detectChanges();
    });

    ['Enter', 'Space'].forEach(code => {
      it(`should submit once when ${code} is pressed on the rendered login button`, () => {
        const loginButton: HTMLElement = fixture.nativeElement.querySelector(
          'ion-button[type="submit"]'
        );

        loginButton.dispatchEvent(new KeyboardEvent('keydown', { code }));

        expect(authService.deprecatingLogin).toHaveBeenCalledTimes(1);
        expect(authService.deprecatingLogin).toHaveBeenCalledWith({
          email: 'learner@example.com',
          password: 'secret',
        });
      });
    });
  });
});
