import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { Router } from '@angular/router';

import { ChatInfoComponent } from './chat-info.component';
import { UtilsService } from '@services/utils.service';
import { MockRouter } from '@testing/mocked.service';
import { ModalController } from '@ionic/angular';
import { BrowserStorageService } from '@services/storage.service';
import { ChatService } from '../chat.service';
import { of } from 'rxjs';
import { TestUtils } from '@testing/utils';

describe('ChatInfoComponent', () => {
  let component: ChatInfoComponent;
  let fixture: ComponentFixture<ChatInfoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let chatServiceSpy: jasmine.SpyObj<ChatService>;
  let utils: UtilsService;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  const modalSpy = jasmine.createSpyObj('Modal', ['present', 'onDidDismiss']);
  modalSpy.onDidDismiss.and.returnValue(new Promise(() => {}));
  const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss', 'create']);
  modalCtrlSpy.create.and.returnValue(modalSpy);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInfoComponent],
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
          provide: ModalController,
          useValue: modalCtrlSpy
        },
        {
          provide: ChatService,
          useValue: jasmine.createSpyObj('ChatService', ['getChatMembers'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['getCurrentChatChannel', 'getUser'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    chatServiceSpy = TestBed.inject(ChatService) as jasmine.SpyObj<ChatService>;
    utils = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
  });

  const mockMembers = [
    {
      uuid: '1',
      name: 'student+01',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '2',
      name: 'student1',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    },
    {
      uuid: '3',
      name: 'student2',
      role: 'participant',
      avatar: 'https://www.gravatar.com/avatar/21b7427270a606e8a3c4413a13bb47c6?d=https://sandbox.practera.com/img/user-512.png&s=50'
    }
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when testing ngOnInit()', () => {
    it(`should call chat service to get memeber list`, () => {
      chatServiceSpy.getChatMembers.and.returnValue(of(mockMembers));
      component.selectedChat = {
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
      component.ngOnInit();
      expect(chatServiceSpy.getChatMembers.calls.count()).toBe(1);
    });
  });

  describe('when testing close()', () => {
    it('should call router navigate if keybord event enter', () => {
      component.selectedChat = {
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
      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      spyOn(component.navigate, 'emit');
      spyOn(utils, 'isMobile').and.returnValue(false);
      component.close(keyEvent);
      expect(component.navigate.emit).toHaveBeenCalled();
    });
    xit('should not do anything if keybord event not enter or space', () => {
      const keyEvent = new KeyboardEvent('keydown', { key: 'A' });
      spyOn(component.navigate, 'emit');
      spyOn(utils, 'isMobile').and.returnValue(false);
      component.close(keyEvent);
      expect(component.navigate.emit).not.toHaveBeenCalled();
    });
  });

});
