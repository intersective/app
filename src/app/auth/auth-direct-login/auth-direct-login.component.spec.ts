import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { AuthDirectLoginComponent } from './auth-direct-login.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { SwitcherService } from '../../switcher/switcher.service';
import { BrowserStorageService } from '@services/storage.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { BrowserStorageServiceMock } from '@testing/mocked.service';
import { TestUtils } from '@testing/utils';


describe('AuthDirectLoginComponent', () => {
  let component: AuthDirectLoginComponent;
  let fixture: ComponentFixture<AuthDirectLoginComponent>;
  let serviceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: ActivatedRoute;
  let utils: UtilsService;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let switcherSpy: jasmine.SpyObj<SwitcherService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ AuthDirectLoginComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        NewRelicService,
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: BrowserStorageService,
          useClass: BrowserStorageServiceMock
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['directLogin'])
        },
        {
          provide: SwitcherService,
          useValue: jasmine.createSpyObj('SwitcherService', ['getMyInfo', 'switchProgram'])
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['alert'])
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                authToken: 'abc'
              })
            }
          }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDirectLoginComponent);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    routeSpy = TestBed.inject(ActivatedRoute);
    utils = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    switcherSpy = TestBed.inject(SwitcherService) as jasmine.SpyObj<SwitcherService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
  });

  beforeEach(() => {
    serviceSpy.directLogin.and.returnValue(of({}));
    switcherSpy.getMyInfo.and.returnValue(of({}));
    switcherSpy.switchProgram.and.returnValue(of({}));
    storageSpy.get.and.returnValue([{timeline: {id: 1}}]);
    storageSpy.getConfig.and.returnValue({logo: null});
  });

  describe('when testing ngOnInit()', () => {
    it('should pop up alert if auth token is not provided', fakeAsync(() => {
      const params = { authToken: null };
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => params[key]);
      utils.isEmpty = jasmine.createSpy('isEmpty').and.returnValue(true);

      tick(50);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(notificationSpy.alert.calls.count()).toBe(1);
      });
    }));

    it('should pop up alert if direct login service throw error', fakeAsync(() => {
      const params = { authToken: 'abc' };
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => params[key]);
      serviceSpy.directLogin.and.throwError('');
      fixture.detectChanges();
      tick(50);
      fixture.detectChanges();
      expect(notificationSpy.alert.calls.count()).toBe(1);
      notificationSpy.alert.calls.first().args[0].buttons[0].handler();
      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['login']);
    }));

    describe('should navigate to', () => {
      let redirect;
      let switchProgram = true;
      const params = {
        authToken: 'abc',
        redirect: '',
        tl: 1,
        act: 2,
        ctxt: 3,
        asmt: 4,
        sm: 5,
        top: 6,
      };
      let tmpParams;
      let doAuthentication;
      let setReferrerCalled = false;
      beforeEach(() => {
        tmpParams = JSON.parse(JSON.stringify(params));
        doAuthentication = true;
        setReferrerCalled = false;
      });

      afterEach(fakeAsync(() => {
        storageSpy.getUser.and.returnValue({
          timelineId: 2
        });
        utils.find = jasmine.createSpy('find').and.returnValue([]);
        routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => tmpParams[key]);
        fixture.detectChanges();
        tick(50);
        fixture.detectChanges();

        if (doAuthentication) {
          expect(serviceSpy.directLogin.calls.count()).toBe(1);
          expect(switcherSpy.getMyInfo.calls.count()).toBe(1);
        } else {
          expect(serviceSpy.directLogin.calls.count()).toBe(0);
          expect(switcherSpy.getMyInfo.calls.count()).toBe(0);
        }

        if (switchProgram) {
          expect(switcherSpy.switchProgram.calls.count()).toBe(1);
        }
        if (setReferrerCalled) {
          expect(storageSpy.setReferrer.calls.count()).toBe(1);
        }

        expect(routerSpy.navigate.calls.first().args[0]).toEqual(redirect);
      }));

      it('skip authentication if auth token match', () => {
        switchProgram = false;
        redirect = ['switcher', 'switcher-program'];
        storageSpy.get.and.returnValue('abc');
        doAuthentication = false;
      });
      it('program switcher page if timeline id is not passed in', () => {
        switchProgram = false;
        redirect = ['switcher', 'switcher-program'];
      });
      it('program switcher page if timeline id is not in programs', () => {
        utils.isEmpty = jasmine.createSpy('isEmpty').and.returnValue(true);

        tmpParams.redirect = 'home';
        switchProgram = false;
        redirect = ['switcher', 'switcher-program'];
      });
      it('home page', () => {
        tmpParams.redirect = 'home';
        redirect = ['app', 'home'];
      });
      it('project page', () => {
        tmpParams.redirect = 'project';
        redirect = ['app', 'home'];
      });
      it('home page if activity id miss', () => {
        tmpParams.redirect = 'activity';
        tmpParams.act = null;
        redirect = ['app', 'home'];
      });
      it('activity page', () => {
        tmpParams.redirect = 'activity';
        redirect = ['app', 'activity', tmpParams.act];
      });
      it('activity-task page', () => {
        tmpParams.redirect = 'activity_task';
        redirect = ['activity-task', tmpParams.act];
      });
      it('activity-task page with referrer url', () => {
        tmpParams.redirect = 'activity_task';
        tmpParams.activity_task_referrer_url = 'https://referrer.practera.com';
        redirect = ['activity-task', tmpParams.act];
        setReferrerCalled = true;
      });
      it('home page if activity id miss', () => {
        tmpParams.redirect = 'activity_task';
        tmpParams.act = null;
        redirect = ['app', 'home'];
      });
      it('home page if activity id miss', () => {
        tmpParams.redirect = 'assessment';
        tmpParams.act = null;
        redirect = ['app', 'home'];
      });
      it('home page if context id miss', () => {
        tmpParams.redirect = 'assessment';
        tmpParams.ctxt = null;
        redirect = ['app', 'home'];
      });
      it('home page if assessment id miss', () => {
        tmpParams.redirect = 'assessment';
        tmpParams.asmt = null;
        redirect = ['app', 'home'];
      });
      it('assessment page', () => {
        utils.isMobile = jasmine.createSpy('isMobile').and.returnValues(false);
        storageSpy.singlePageAccess = false;

        tmpParams.redirect = 'assessment';
        redirect = [
          'app',
          'activity',
          tmpParams.act,
          {
            task: 'assessment',
            task_id: tmpParams.asmt,
            context_id: tmpParams.ctxt
          }
        ];
        // redirect = ['assessment', 'assessment', tmpParams.act, tmpParams.ctxt, tmpParams.asmt];
      });

      it('assessment page (mobile)', () => {
        utils.isMobile = jasmine.createSpy('isMobile').and.returnValues(true);

        tmpParams.redirect = 'assessment';
        redirect = [
          'assessment',
          'assessment',
          tmpParams.act,
          tmpParams.ctxt,
          tmpParams.asmt,
        ];
      });

      it('assessment page (onePageOnly restriction)', () => {
        storageSpy.singlePageAccess = true; // singlePageRestriction

        tmpParams.redirect = 'assessment';
        redirect = [
          'assessment',
          'assessment',
          tmpParams.act,
          tmpParams.ctxt,
          tmpParams.asmt,
        ];
      });

      it('assessment page with referrer', () => {
        utils.isMobile = jasmine.createSpy('isMobile').and.returnValues(false);
        storageSpy.singlePageAccess = false;
        tmpParams.assessment_referrer_url = 'https://referrer.practera.com';
        tmpParams.redirect = 'assessment';
        redirect = [
          'app',
          'activity',
          tmpParams.act,
          {
            task: 'assessment',
            task_id: tmpParams.asmt,
            context_id: tmpParams.ctxt
          }
        ];
        setReferrerCalled = true;
      });

      it('topic page', () => {
        utils.isMobile = jasmine.createSpy('isMobile').and.callFake(() => {
          return false;
        });
        storageSpy.singlePageAccess = false; // singlePageRestriction

        tmpParams.redirect = 'topic';
        redirect = [
          'app',
          'activity',
          tmpParams.act,
          {
            task: 'topic',
            task_id: tmpParams.top
          }
        ];
      });

      it('topic page (mobile)', () => {
        utils.isMobile = jasmine.createSpy('isMobile').and.callFake(() => {
          return true;
        });

        tmpParams.redirect = 'topic';
        redirect = [
          'topic',
          tmpParams.act,
          tmpParams.top
        ];
      });

      it('topic page (onePageOnly restriction)', () => {
        storageSpy.get.and.returnValue(true); // singlePageRestriction

        tmpParams.redirect = 'topic';
        redirect = [
          'topic',
          tmpParams.act,
          tmpParams.top
        ];
      });

      it('home page if topic id miss', () => {
        tmpParams.redirect = 'topic';
        tmpParams.top = null;
        redirect = ['app', 'home'];
      });
      it('reviews page', () => {
        tmpParams.redirect = 'reviews';
        redirect = ['app', 'reviews'];
      });
      it('home page if context id miss', () => {
        tmpParams.redirect = 'review';
        tmpParams.ctxt = null;
        redirect = ['app', 'home'];
      });
      it('home page if assessment id miss', () => {
        tmpParams.redirect = 'review';
        tmpParams.asmt = null;
        redirect = ['app', 'home'];
      });
      it('home page if submission id miss', () => {
        tmpParams.redirect = 'review';
        tmpParams.sm = null;
        redirect = ['app', 'home'];
      });
      it('review page', () => {
        tmpParams.redirect = 'review';
        redirect = ['assessment', 'review', tmpParams.ctxt, tmpParams.asmt, tmpParams.sm];
      });
      it('review page with referrer', () => {
        tmpParams.redirect = 'review';
        tmpParams.assessment_referrer_url = 'https://referrer.practera.com';
        redirect = ['assessment', 'review', tmpParams.ctxt, tmpParams.asmt, tmpParams.sm];
        setReferrerCalled = true;
      });
      it('chat page', () => {
        tmpParams.redirect = 'chat';
        redirect = ['app', 'chat'];
      });
      it('settings page', () => {
        tmpParams.redirect = 'settings';
        redirect = ['app', 'settings'];
      });
      it('settings embed page', () => {
        tmpParams.redirect = 'settings-embed';
        redirect = ['settings-embed'];
      });
      it('home page', () => {
        tmpParams.redirect = 'default';
        redirect = ['app', 'home'];
      });

    });
  });

  describe('singlePageRestriction()', () => {
    it('should cache "onePageOnly" as singlePageRestriction on localStorage', () => {
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.returnValue('true');
      const result = component.singlePageRestriction();
      expect(storageSpy.singlePageAccess).toEqual(true);
      expect(result).toEqual(true);
    });

    it('should not cache anything if no "onePageOnly" param provided in url', () => {
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.returnValue('anything else');
      const result = component.singlePageRestriction();
      expect(storageSpy.singlePageAccess).toEqual(false);
      expect(result).toBeFalsy();
    });
  });
});

