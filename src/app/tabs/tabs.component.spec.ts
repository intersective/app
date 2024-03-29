import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsService } from './tabs.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { SwitcherService } from '../switcher/switcher.service';
import { ReviewListService } from '../review-list/review-list.service';
import { EventListService } from '@app/event-list/event-list.service';
import { Router } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { Observable, of, pipe, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './tabs.component';
import { ModalController } from '@ionic/angular';
import { MockRouter } from '@testing/mocked.service';
import { TestUtils } from '@testing/utils';
import { ChatService } from '@app/chat/chat.service';
import { ChatsFixture } from '@testing/fixtures';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let tabsSpy: jasmine.SpyObj<TabsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let newRelicSpy: jasmine.SpyObj<NewRelicService>;
  let switcherSpy: jasmine.SpyObj<SwitcherService>;
  let sharedSpy: jasmine.SpyObj<SharedService>;
  let reviewsSpy: jasmine.SpyObj<ReviewListService>;
  let eventsSpy: jasmine.SpyObj<EventListService>;
  let chatSpy: jasmine.SpyObj<ChatService>;
  let utils: UtilsService;

  const preset = {
    singlePageAccess: false,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TabsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils,
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
          provide: BrowserStorageService,
          // we've already used BrowserStorageService in the constructor(), so we have to mock the return data when defined
          useValue: jasmine.createSpyObj('BrowserStorageService', {
            getUser: {
              role: 'participant',
              teamId: 1,
              name: 'Test User',
              email: 'user@test.com',
              id: 1
            },
            get: false,
          })
        },
        {
          provide: NewRelicService,
          useValue: jasmine.createSpyObj('NewRelicService', ['setPageViewName', 'actionText', 'noticeError'])
        },
        {
          provide: SwitcherService,
          useValue: jasmine.createSpyObj('SwitcherService', ['getTeamInfo'])
        },
        {
          provide: ReviewListService,
          useValue: jasmine.createSpyObj('ReviewListService', ['getReviews'])
        },
        {
          provide: EventListService,
          useValue: jasmine.createSpyObj('EventListService', ['getEvents'])
        },
        {
          provide: ChatService,
          useValue: jasmine.createSpyObj('ChatService', ['getChatList']),
        },
        {
          provide: SharedService,
          useValue: jasmine.createSpyObj('SharedService', [
            'getTeamInfo',
            'stopPlayingVideos',
            'markTopicStopOnNavigating',
          ])
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: SharedService,
          useValue: jasmine.createSpyObj('SharedService', [
            'getTeamInfo',
            'stopPlayingVideos',
            'markTopicStopOnNavigating',
          ])
        }
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
    newRelicSpy = TestBed.inject(NewRelicService) as jasmine.SpyObj<NewRelicService>;
    switcherSpy = TestBed.inject(SwitcherService) as jasmine.SpyObj<SwitcherService>;
    reviewsSpy = TestBed.inject(ReviewListService) as jasmine.SpyObj<ReviewListService>;
    eventsSpy = TestBed.inject(EventListService) as jasmine.SpyObj<EventListService>;
    chatSpy = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
    sharedSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;

    sharedSpy.getTeamInfo.and.returnValue(of(''));
    reviewsSpy.getReviews.and.returnValue(of(['', '']));
    eventsSpy.getEvents.and.returnValue(of([{ id: 1 }]));
    tabsSpy.getNoOfChats.and.returnValue(of(4));
    tabsSpy.getNoOfTodoItems.and.returnValue(of(5));
    component.routeUrl = '/test';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor() (without onePageOnly restriction)', () => {
    preset.singlePageAccess = false;

    it('should get correct event data', () => {
      expect(component.noOfTodoItems).toBe(0);
      expect(component.noOfChats).toBe(0);
      utils.broadcastEvent('notification', '');
      expect(component.noOfTodoItems).toBe(1);
      utils.broadcastEvent('event-reminder', '');
      expect(component.noOfTodoItems).toBe(2);
      tabsSpy.getNoOfChats.and.returnValue(of(3));
      utils.broadcastEvent('chat:new-message', '');
      expect(component.noOfChats).toBe(3);
      tabsSpy.getNoOfChats.and.returnValue(of(4));
    });
  });

  describe('when testing onEnter()', () => {
    it('should get correct data (when chat enabled)', () => {
      storageSpy.get.and.returnValue(0);
      storageSpy.getUser.and.returnValue({
        chatEnabled: true,
        teamId: 999
      });
      chatSpy.getChatList.and.returnValue(of(ChatsFixture));
      fixture.detectChanges();

      expect(component.noOfTodoItems).toBe(5);
      expect(component.noOfChats).toBe(4);
      expect(component.showChat).toBe(true);
      expect(component.showReview).toBe(true);
      expect(component.showEvents).toBe(true);
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
      expect(component.noOfChats).toBe(0);
      expect(component.showChat).toBe(false);
      expect(component.showReview).toBe(true);
      expect(component.showEvents).toBe(true);
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
      expect(component.noOfChats).toBe(0);
      expect(component.showChat).toBe(false);
      expect(component.showReview).toBe(false);
      expect(component.showEvents).toBe(false);
    });
  });

  describe('when testing _checkRoute()', () => {
    it('should select overview tab', () => {
      // spyOnProperty(routerSpy, 'url', 'get').and.returnValue('/app/home');
      // expect(component.selectedTab).toEqual('home');
    });
  });
});
