import { Component } from '@angular/core';
import { TabsService } from './tabs.service';
import { UtilsService } from '@services/utils.service';
import { NativeStorageService } from '@services/native-storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { SwitcherService } from '../switcher/switcher.service';
import { ReviewListService } from '@app/review-list/review-list.service';
import { Router } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { EventListService } from '@app/event-list/event-list.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss']
})
export class TabsComponent extends RouterEnter {
  routeUrl = '/app';
  showReview = false;
  showChat = false;
  showEvents = false;
  noOfTodoItems = 0;
  noOfChats = 0;
  selectedTab = '';

  constructor(
    public router: Router,
    private tabsService: TabsService,
    public utils: UtilsService,
    private switcherService: SwitcherService,
    private reviewsService: ReviewListService,
    private sharedService: SharedService,
    private eventsService: EventListService,
    private newRelic: NewRelicService,
    private nativeStorage: NativeStorageService
  ) {
    super(router);
    this.newRelic.setPageViewName('tab');

    this.utils.getEvent('notification').subscribe(event => {
      this.noOfTodoItems++;
    });
    this.utils.getEvent('event-reminder').subscribe(event => {
      this.noOfTodoItems++;
    });
    this.utils.getEvent('chat:new-message').subscribe(event => {
      this.tabsService.getNoOfChats().subscribe(noOfChats => {
        this.noOfChats = noOfChats;
      });
    });
    this.utils.getEvent('chat-badge-update').subscribe(event => {
      this.tabsService.getNoOfChats().subscribe(noOfChats => {
        this.noOfChats = noOfChats;
      });
    });
  }

  private _initialise() {
    this.showChat = false;
    this.showReview = false;
    this.showEvents = false;
  }

  onEnter() {
    this._initialise();
    this._checkRoute();
    this._stopPlayingVideos();
    this._topicStopReading();
    fromPromise(this.tabsService.getNoOfTodoItems()).subscribe(noOfTodoItems => {
      noOfTodoItems.subscribe(quantity => {
        this.noOfTodoItems = quantity;
      });
    });

    fromPromise(this.nativeStorage.getObject('user')).subscribe(user => {
      const {
        teamId,
        hasReviews,
        hasEvents
      } = user;
      // only get the number of chats if user is in team
      if (teamId) {
        this.tabsService.getNoOfChats().subscribe(noOfChats => {
          this.noOfChats = noOfChats;
        });
      }
      // display the chat tab if the user is in team
      if (teamId) {
        this.showChat = true;
      } else {
        this.showChat = false;
        this.switcherService.getTeamInfo().subscribe(data => {
          if (teamId) {
            this.showChat = true;
          }
        });
      }
      if (hasReviews) {
        this.showReview = true;
      } else {
        this.showReview = false;
        this.reviewsService.getReviews().subscribe(data => {
          if (data.length) {
            this.showReview = true;
          }
        });
      }
      if (hasEvents) {
        this.showEvents = true;
      } else {
        this.showEvents = false;
        this.eventsService.getEvents().subscribe(events => {
          this.showEvents = !this.utils.isEmpty(events);
        });
      }
    });
  }

  private _checkRoute() {
    this.newRelic.actionText(`selected ${this.router.url}`);
    switch (this.router.url) {
      case '/app/home':
        this.selectedTab = 'overview';
        break;

      case '/app/events':
        this.selectedTab = 'events';
        break;

      case '/app/settings':
        this.selectedTab = 'settings';
        break;

      case '/app/chat':
        this.selectedTab = 'chat';
        break;

      default:
        if (this.router.url.includes('/app/home')) {
          this.selectedTab = 'overview';
        } else if (this.router.url.includes('/app/reviews')) {
          this.selectedTab = 'reviews';
        } else {
          this.selectedTab = '';
        }
        break;
    }
  }

  private _stopPlayingVideos() {
    this.sharedService.stopPlayingVideos();
  }

  private _topicStopReading() {
    // if user looking at topic mark it stop reading before go back.
    this.sharedService.markTopicStopOnNavigating();
  }

}
