import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { Router } from '@angular/router';

import { ChatViewComponent } from './chat-view.component';
import { UtilsService } from '@services/utils.service';
import { MockRouter } from '@testing/mocked.service';
import { Apollo } from 'apollo-angular';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let utils: UtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatViewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        Apollo,
        UtilsService,
        {
          provide: Router,
          useClass: MockRouter
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
    component.chatList = { onEnter() {} };
    component.chatRoom = { onEnter() {} };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct activity id', fakeAsync(() => {
    spyOn(component.chatList, 'onEnter');
    component.onEnter();
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

});
