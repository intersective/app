import { async, ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChatViewComponent } from './chat-view.component';
import { UtilsService } from '@v3/services/utils.service';
import { TestUtils } from '@testingv3/utils';
import { ActivatedRouteStub } from '@testingv3/activated-route-stub';
import { MockRouter } from '@testingv3/mocked.service';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let utils: UtilsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChatViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({})
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    utils = TestBed.inject(UtilsService);
    component.chatList = {
      onEnter: jasmine.createSpy()
    };
    component.chatRoom = {
      ngOnInit: jasmine.createSpy()
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const mockChats = {
    data: {
      channels: [
        {
          uuid: '35326928',
          name: 'Team 1',
          avatar: 'https://sandbox.practera.com/img/team-white.png',
          pusherChannel: 'sdb746-93r7dc-5f44eb4f',
          isAnnouncement: false,
          isDirectMessage: false,
          readonly: false,
          roles: [
            'participant',
            'coordinator',
            'admin'
          ],
          unreadMessageCount: 0,
          lastMessage: null,
          lastMessageCreated: null,
          canEdit: false
        },
        {
          uuid: 'ced963c1',
          name: 'Team 1 + Mentor',
          avatar: 'https://sandbox.practera.com/img/team-white.png',
          pusherChannel: 'kb5gt-9nfbj-5f45eb4g',
          isAnnouncement: false,
          isDirectMessage: false,
          readonly: false,
          roles: [
            'participant',
            'mentor',
            'coordinator',
            'admin'
          ],
          unreadMessageCount: 0,
          lastMessage: null,
          lastMessageCreated: null,
          canEdit: false
        }
      ]
    }
  };

  it('should get correct activity id', fakeAsync(() => {
    component.ngOnInit();
    expect(component.chatChannel).toBeNull();
    expect(component.loadInfo).toBeFalsy();
    tick();
    expect(component.chatList.onEnter).toHaveBeenCalled();
  }));

  describe('when testing loadchannelInfo()', () => {
    it(`should make loadInfo true to load info page`, () => {
      component.loadchannelInfo(null);
      expect(component.loadInfo).toBe(true);
    });
  });

  describe('selectFirstChat()', () => {
    it(`should load chat room`, fakeAsync(() => {
      component.chatChannel = null;
      component.selectFirstChat(mockChats.data.channels);
      expect(component.loadInfo).toBe(false);
      expect(component.chatChannel).toBe(mockChats.data.channels[0]);
      tick();
    }));
  });

  describe('when testing desktopGoto()', () => {
    it(`should call chat room onEnter`, fakeAsync(() => {
      const chatChannel = {
        uuid: '35326928',
        name: 'Team 1',
        avatar: 'https://sandbox.practera.com/img/team-white.png',
        pusherChannel: 'sdb746-93r7dc-5f44eb4f',
        isAnnouncement: false,
        isDirectMessage: false,
        readonly: false,
        roles: [
          'participant',
          'coordinator',
          'admin'
        ],
        unreadMessageCount: 0,
        lastMessage: null,
        lastMessageCreated: null,
        canEdit: false
      };
      component.desktopGoto(chatChannel, { click: true });
      expect(component.loadInfo).toBe(false);
      expect(component.chatChannel).toEqual(chatChannel);
      tick();
      expect(component.chatRoom.ngOnInit).toHaveBeenCalled();
    }));
  });

});
