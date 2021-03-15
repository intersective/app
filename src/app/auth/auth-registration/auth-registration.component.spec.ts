import { async, ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from '@services/utils.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthService } from '../auth.service';
import { AuthRegistrationComponent } from './auth-registration.component';
import { BrowserStorageService } from '@services/storage.service';
import { NotificationService } from '@shared/notification/notification.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { SwitcherService } from '../../switcher/switcher.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ModalController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('AuthRegistrationComponent', () => {
  let component: AuthRegistrationComponent;
  let fixture: ComponentFixture<AuthRegistrationComponent>;
  let newRelicSpy: jasmine.SpyObj<NewRelicService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let switcherSpy: jasmine.SpyObj<SwitcherService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, IonicModule],
      declarations: [ AuthRegistrationComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', ['has', 'find'])
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 1,
                activityId: 2,
                contextId: 3,
                submissionId: 4
              }),
              data: {
                action: 'assessment',
                from: ''
              },
            },
            params: of(true),
            queryParamMap: of(true)
          }
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', {
            'saveRegistration': of(true),
            'login': of(true),
            'verifyRegistration': of(true),
            'checkDomain': of(true),
          })
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['setUser', 'getUser', 'set', 'getConfig', 'setConfig', 'get', 'clear', 'remove'])
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['alert', 'popUp'])
        },
        {
          provide: NewRelicService,
          useValue: jasmine.createSpyObj('NewRelicService', {
            'setPageViewName': () => true,
            'createTracer': () => () => true,
            'actionText': () => true
          })
        },
        {
          provide: SwitcherService,
          useValue: jasmine.createSpyObj('SwitcherService', ['switchProgramAndNavigate'])
        },
        ModalController,
        /*{
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', {
            create: {
              present: () => Promise.resolve(true),
              onWillDismiss: (data) => Promise.resolve({
                data: {
                  isAgreed: data
                }
              })
            }
          })
        },*/
      ],
    })
    .compileComponents();

    newRelicSpy = TestBed.inject(NewRelicService) as jasmine.SpyObj<NewRelicService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    switcherSpy = TestBed.inject(SwitcherService) as jasmine.SpyObj<SwitcherService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegistrationComponent);
    component = fixture.componentInstance;
    component.initForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup base settings', () => {
    const domain = 'UNIT_TEST_SAMPLE';
    component.domain = domain;
    component.validateQueryParams = jasmine.createSpy('validateQueryParams');
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(newRelicSpy.setPageViewName).toHaveBeenCalledWith('registration');
      expect(component.validateQueryParams).toHaveBeenCalled();
      expect(component.domain).toEqual(domain);
      expect(storageSpy.get).toHaveBeenCalledWith('unRegisteredDirectLink');
    });
  });

  it('should initForm() prepare registrationForm object', () => {
    component.initForm();
    // console.log('CR::', component.registrationForm);
    // console.log('CR-controls::', component.registrationForm.controls);
    const { email, password, confirmPassword } = component.registrationForm.controls;

    expect(email instanceof FormControl).toBeTruthy();
    expect(password instanceof FormControl).toBeTruthy();
    expect(confirmPassword instanceof FormControl).toBeTruthy();

    expect(email.pristine).toBeTruthy();
    expect(password.pristine).toBeTruthy();
    expect(confirmPassword.pristine).toBeTruthy();


    expect(email.invalid).toBeFalsy();
    email.setValue("any-email");
    expect(email.value).toEqual("any-email");
    expect(email.invalid).toBeTruthy();

    email.setValue("test@email.com");
    expect(email.invalid).toBeFalsy();
  });

  describe('register()', () => {
    it('should fail if validateRegistration is false', () => {
      component.validateRegistration = jasmine.createSpy('validateRegistration').and.returnValue(false);
      const result = component.register();
      expect(result).toBeFalsy();
    });

    it('should generate password if unRegisteredDirectLink is true', fakeAsync(() => {
      component.validateRegistration = jasmine.createSpy('validateRegistration').and.returnValue(true);
      component.unRegisteredDirectLink = true;
      expect(component.user.password).toBeUndefined();
      expect(component.confirmPassword).toBeUndefined();

      const result = component.register();
      flush();

      expect(component.user.password).not.toBeUndefined();
      expect(component.confirmPassword).not.toBeUndefined();
      expect(component.confirmPassword === component.user.password).toBeTruthy();
      expect(switcherSpy.switchProgramAndNavigate).toHaveBeenCalled();
    }));
  });

  describe('openLink()', () => {
    it('should open pdf link', () => {
      window.open = jasmine.createSpy('open');
      component.openLink();

      expect(window.open).toHaveBeenCalledWith('https://images.practera.com/terms_and_conditions/practera_default_terms_conditions_july2018.pdf', '_system');
    });
  });

  describe('validateRegistration()', () => {
    it('should return true if unRegisteredDirectLink invalid', () => {
      component.unRegisteredDirectLink = false;
      const valid = component.validateRegistration();
      expect(valid).toBeFalsy();
    });

    it('should return false if hide_password valid & isAgreed is false', () => {
      component.unRegisteredDirectLink = false;
      component.hide_password = true;
      component.isAgreed = false;
      const valid = component.validateRegistration();
      expect(valid).toBeFalsy();
    });

    it('should return true if hide_password valid & isAgreed is true', () => {
      component.hide_password = true;
      component.isAgreed = true;
      const valid = component.validateRegistration();
      expect(valid).toBeTruthy();
    });

    it('should return true if hide_password valid & wrong passwords & isAgreed is true', () => {
      component.unRegisteredDirectLink = false;
      component.hide_password = false;
      component.isAgreed = true;

      const { email, password, confirmPassword } = component.registrationForm.controls;

      email.setValue('user@test.com');
      password.setValue('password1');
      confirmPassword.setValue('different-password');

      expect(component.registrationForm.valid).toBeTruthy();

      const valid = component.validateRegistration();
      expect(valid).toBeFalsy();
    });

    it('should return true if hide_password valid & correct passwords & isAgreed is false', () => {
      component.unRegisteredDirectLink = false;
      component.hide_password = false;
      component.isAgreed = true;

      const { email, password, confirmPassword } = component.registrationForm.controls;

      email.setValue('user@test.com');
      password.setValue('same-password');
      confirmPassword.setValue('same-password');

      expect(component.registrationForm.valid).toBeTruthy();

      const valid = component.validateRegistration();
      expect(valid).toBeTruthy();
    });
  });

  /*describe('termsAndConditionsPopup()', () => {
    it('should do something', fakeAsync(() => {
      const asd = await component.termsAndConditionsPopup()
      flush();
      console.log('asd::', asd)
      asd.then((test) => {
        console.log('test::', test);
      });

      // const bbb = aaa.then(test => {
      //   console.log('bbb', test);
      // })
      // console.log('bbb::', bbb);
    }));
  });*/
});
