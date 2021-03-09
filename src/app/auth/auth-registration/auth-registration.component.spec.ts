import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from '@services/utils.service';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
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
          useValue: jasmine.createSpyObj('AuthService', ['saveRegistration', 'login', 'verifyRegistration', 'checkDomain'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['setUser', 'getUser', 'set', 'getConfig', 'setConfig', 'get', 'clear'])
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['alert', 'popUp'])
        },
        {
          provide: NewRelicService,
          useValue: jasmine.createSpyObj('NewRelicService', ['setPageViewName', 'createTracer'])
        },
        {
          provide: SwitcherService,
          useValue: jasmine.createSpyObj('SwitcherService', ['switchProgramAndNavigate'])
        },
        {
          provide: ModalController,
          useValue: jasmine.createSpyObj('ModalController', ['create'])
        },
      ],
    })
    .compileComponents();

    newRelicSpy = TestBed.inject(NewRelicService) as jasmine.SpyObj<NewRelicService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
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
});
