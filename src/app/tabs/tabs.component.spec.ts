import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { TabsService } from './tabs.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { AuthService } from '../auth/auth.service';
import { SwitcherService } from '../switcher/switcher.service';
import { ReviewListService } from '../review-list/review-list.service';
import { EventListService } from '@app/event-list/event-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { Observable, of, pipe, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './tabs.component';
import { ModalController } from '@ionic/angular';
import { TestUtils } from '@testing/utils';
import { ChatService } from '@app/chat/chat.service';
import { ChatsFixture } from '@testing/fixtures';
import { MockRouter, MockActivatedRouter } from '@testing/mocked.service';
import { RequestService } from '@shared/request/request.service';
import { PushNotificationService } from '@services/push-notification.service';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let tabsSpy: jasmine.SpyObj<TabsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorageService>;
  let pushNotificationSpy: jasmine.SpyObj<PushNotificationService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let newRelicSpy: jasmine.SpyObj<NewRelicService>;
  let switcherSpy: jasmine.SpyObj<SwitcherService>;
  let shareSpy: jasmine.SpyObj<SharedService>;
  let reviewsSpy: jasmine.SpyObj<ReviewListService>;
  let eventsSpy: jasmine.SpyObj<EventListService>;
  let chatSpy: jasmine.SpyObj<ChatService>;
  let utils: UtilsService;
  let requestSpy: jasmine.SpyObj<RequestService>;

  const preset = {
    singlePageAccess: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TabsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: SharedService,
          useValue: jasmine.createSpyObj('SharedService', ['stopPlayingVideos', 'markTopicStopOnNavigating'])
        },
        {
          provide: ModalController,
          useValue: {
            dismiss: jasmine.createSpy('dismiss')
          }
        },
        {
          provide: TabsService,
          useValue: jasmine.createSpyObj('TabsService', ['getNoOfChats', 'getNoOfTodoItems'])
        },
        {
          provide: NativeStorageService,
          useValue: jasmine.createSpyObj('NativeStorageService', {
            'getObject': new Promise(resolve => resolve({
              role: 'participant',
              teamId: 1,
              name: 'Test User',
              email: 'user@test.com',
              id: 1
            })),
            get: false,
          })
        },
        {
          provide: NewRelicService,
          useValue: jasmine.createSpyObj('NewRelicService', ['setPageViewName', 'actionText', 'noticeError'])
        },
        {
          provide: SwitcherService,
          useValue: jasmine.createSpyObj('SwitcherService', {
            'getTeamInfo': of(true)
          })
        },
        {
          provide: ReviewListService,
          useValue: jasmine.createSpyObj('ReviewListService', {
            'getReviews': of(true)
          })
        },
        {
          provide: EventListService,
          useValue: jasmine.createSpyObj('EventListService', {
            'getEvents': of(true)
          })
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get'])
        },
        {
          provide: PushNotificationService,
          useValue: jasmine.createSpyObj('PushNotificationService', ['subscribeToInterests'])
        },
        {
          provide: ChatService,
          useValue: jasmine.createSpyObj('ChatService', ['getChatList']),
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRouter
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['getUUID'])
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    storageSpy.singlePageAccess = preset.singlePageAccess;

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    tabsSpy = TestBed.inject(TabsService) as jasmine.SpyObj<TabsService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    utils = TestBed.inject(UtilsService);
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    nativeStorageSpy = TestBed.inject(NativeStorageService) as jasmine.SpyObj<NativeStorageService>;
    newRelicSpy = TestBed.inject(NewRelicService) as jasmine.SpyObj<NewRelicService>;
    switcherSpy = TestBed.inject(SwitcherService) as jasmine.SpyObj<SwitcherService>;
    reviewsSpy = TestBed.inject(ReviewListService) as jasmine.SpyObj<ReviewListService>;
    eventsSpy = TestBed.inject(EventListService) as jasmine.SpyObj<EventListService>;
    chatSpy = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    shareSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    pushNotificationSpy = TestBed.inject(PushNotificationService) as jasmine.SpyObj<PushNotificationService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    switcherSpy.getTeamInfo.and.returnValue(of(''));
    reviewsSpy.getReviews.and.returnValue(of(['', '']));
    eventsSpy.getEvents.and.returnValue(of([{id: 1}]));
    tabsSpy.getNoOfChats.and.returnValue(of(4));
    tabsSpy.getNoOfTodoItems.and.returnValue(Promise.resolve(of(5)));
    component.routeUrl = '/test';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor() (without onePageOnly restriction)', () => {
    preset.singlePageAccess = false;

    it('should get correct event data', () => {
      expect(component.noOfTodoItems).toBe(0);
      expect(component['_noOfChats$'].value).toBe(0);
      utils.broadcastEvent('notification', '');
      expect(component.noOfTodoItems).toBe(1);
      utils.broadcastEvent('event-reminder', '');
      expect(component.noOfTodoItems).toBe(2);
      tabsSpy.getNoOfChats.and.returnValue(of(3));
      utils.broadcastEvent('chat:new-message', '');
      expect(component['_noOfChats$'].value).toBe(3);
      tabsSpy.getNoOfChats.and.returnValue(of(4));
    });
  });

  describe('when testing onEnter()', () => {
    it('should get correct data (when chat enabled)', () => {
      storageSpy.get.and.returnValue(0);
      storageSpy.getUser.and.returnValue({
        chatEnabled: true,
        teamId: 'SAMPLE_ID'
      });
      chatSpy.getChatList.and.returnValue(of(ChatsFixture));
      fixture.detectChanges();

      expect(component.noOfTodoItems).toBe(5);
      expect(component['_noOfChats$'].value).toBe(4);
      expect(component['_showChat$'].value).toBe(true);
      expect(component['_showReview$'].value).toBe(true);
      expect(component['_showEvents$'].value).toBe(true);
    });
    it('should update tabs if user data get updated', fakeAsync(() => {
      const RESULT = {
        teamId: 1,
        hasReviews: true,
        hasEvents: true,
      };

      nativeStorageSpy.getObject.and.returnValue(Promise.resolve(RESULT));
      component.onEnter();
      flush();

      expect(shareSpy.stopPlayingVideos).toHaveBeenCalled();
      expect(shareSpy.markTopicStopOnNavigating).toHaveBeenCalled();
      // expect(tabsSpy.getNoOfChats).toHaveBeenCalled();
    }));

    it('should make API calls to update tabs if teamId is N/A', fakeAsync(() => {
      const RESULT = {
        teamId: null,
        hasReviews: false,
        hasEvents: false,
      };

      nativeStorageSpy.getObject.and.returnValue(Promise.resolve(RESULT));
      component.onEnter();
      flush();

      expect(tabsSpy.getNoOfChats).not.toHaveBeenCalled();
      expect(switcherSpy.getTeamInfo).toHaveBeenCalled();
      expect(reviewsSpy.getReviews).toHaveBeenCalled();
      expect(eventsSpy.getEvents).toHaveBeenCalled();
    }));

    it('should get correct data', fakeAsync(() => {
      storageSpy.get.and.returnValue(0);
      storageSpy.getUser.and.returnValue({
        chatEnabled: true,
        teamId: 999
      });
      chatSpy.getChatList.and.returnValue(of(ChatsFixture));
      fixture.detectChanges();

      expect(component.noOfTodoItems).toBe(5);
      expect(component['_noOfChats$'].value).toBe(4);
      expect(component['_showChat$'].value).toBe(true);
      expect(component['_showReview$'].value).toBe(true);
      expect(component['_showEvents$'].value).toBe(true);

      tabsSpy.getNoOfChats.and.returnValue(of(4));
      tabsSpy.getNoOfTodoItems.and.returnValue(Promise.resolve(of(5)));
      nativeStorageSpy.getObject.and.returnValue(Promise.resolve(0));
      flush();

      component['_me$'].next({
        teamId: true,
        hasReviews: true,
        hasEvents: true,
      });
      utils.broadcastEvent('chat:new-message', '');

      fixture.detectChanges();
      flush();
      fixture.whenStable().then(() => {
        expect(component.noOfTodoItems).toBe(5);
        expect(component['_noOfChats$'].value).toBe(4);
        expect(component['_showChat$'].value).toBe(true);
        expect(component['_showReview$'].value).toBe(true);
        expect(component['_showEvents$'].value).toBe(true);
      });
    }));

    it('should hide chat if _showChat$ is false', () => {
      fixture.detectChanges();
      expect(component['_showChat$'].value).toBe(false);
    });

    it('should get correct data (when chat disabled)', () => {
      storageSpy.get.and.returnValue(0);
      storageSpy.getUser.and.returnValue({
        chatEnabled: false,
        teamId: 9999 // 'SAMPLE_ID'
      });
      chatSpy.getChatList.and.returnValue(of([]));
      fixture.detectChanges();

      expect(component.noOfTodoItems).toBe(5);
      expect(component['_noOfChats$'].value).toBe(0);
      expect(component['_showChat$'].value).toBe(false);
      expect(component['_showReview$'].value).toBe(true);
      expect(component['_showEvents$'].value).toBe(true);
    });

    it('should get correct data without team id', () => {
      storageSpy.getUser.and.returnValue({
        role: 'participant',
        teamId: null,
        name: 'Test User',
        email: 'user@test.com',
      });
      reviewsSpy.getReviews.and.returnValue(of([]));
      eventsSpy.getEvents.and.returnValue(of([]));
      fixture.detectChanges();
      expect(component['_noOfChats$'].value).toBe(0);
      expect(component['_showChat$'].value).toBe(false);
      expect(component['_showReview$'].value).toBe(false);
      expect(component['_showEvents$'].value).toBe(false);
    });
  });

  xdescribe('when testing _checkRoute()', () => {
    it('should select overview tab', () => {
      // spyOnProperty(routerSpy, 'url', 'get').and.returnValue('/app/home');
      // expect(component.selectedTab).toEqual('home');
    });
  });
});
