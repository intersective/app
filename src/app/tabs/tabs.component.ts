import { Component } from '@angular/core';
import { TabsService } from './tabs.service';
import { UtilsService } from '@services/utils.service';
import { NativeStorageService } from '@services/native-storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { AuthService } from '../auth/auth.service';
import { SwitcherService } from '../switcher/switcher.service';
import { PushNotificationService } from '@services/push-notification.service';
import { ReviewListService } from '@app/review-list/review-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { EventListService } from '@app/event-list/event-list.service';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss']
})
export class TabsComponent extends RouterEnter {
  routeUrl = '/app';
  noOfTodoItems = 0;
  selectedTab = '';

  private _me$ = new BehaviorSubject<any>({});
  private _noOfChats$ = new BehaviorSubject<any>(0);
  private _showChat$ = new BehaviorSubject<any>(false);
  private _showEvents$ = new BehaviorSubject<any>(false);
  private _showReview$ = new BehaviorSubject<any>(false);
  me$ = this._me$.asObservable();
  noOfChats$ = this._noOfChats$.asObservable();
  showChat$ = this._showChat$.asObservable();
  showEvents$ = this._showEvents$.asObservable();
  showReview$ = this._showReview$.asObservable();

  constructor(
    readonly utils: UtilsService,
    readonly storage: BrowserStorageService,
    public router: Router,
    private routes: ActivatedRoute,
    private tabsService: TabsService,
    private switcherService: SwitcherService,
    private reviewsService: ReviewListService,
    private sharedService: SharedService,
    private eventsService: EventListService,
    private newRelic: NewRelicService,
    private nativeStorage: NativeStorageService,
    private authService: AuthService,
    private pushNotificationService: PushNotificationService,
  ) {
    super(router);
    this.newRelic.setPageViewName('tab');

    if (this.restrictedAccess === false) {
      this.utils.getEvent('notification').subscribe(event => {
        this.noOfTodoItems++;
      });
      this.utils.getEvent('event-reminder').subscribe(event => {
        this.noOfTodoItems++;
      });

      this.utils.getEvent('chat:new-message').subscribe(event => {
        this.tabsService.getNoOfChats().subscribe(noOfChats => {
          this._noOfChats$.next(noOfChats);
        });
      });
      this.utils.getEvent('chat-badge-update').subscribe(event => {
        this.tabsService.getNoOfChats().subscribe(noOfChats => {
          this._noOfChats$.next(noOfChats);
        });
      });
    }

    this.routes.data.subscribe(data => {
      const { user } = data;
      if (!this.utils.isEqual(this._me$.value, user)) {
        this._me$.next(user);
      }

      // enforced inside tabComponent to guarantee successful retrieval of uuid
      if (!user.uuid) {
        this.authService.getUUID().subscribe(uuid => {
          if (uuid) {
            this.nativeStorage.setObject('me', { uuid });
            this.pushNotificationService.subscribeToInterests(uuid).then(res => {
              console.log('interests::', res);
            });
          } else {
            console.error('Failed UUID retrieval::', uuid);
          }
        });
      }
    });

    this.me$.subscribe(user => this.updateShowList(user));
  }

  get restrictedAccess() {
    return this.storage.singlePageAccess;
  }

  onEnter() {
    this._checkRoute();
    this._stopPlayingVideos();
    this._topicStopReading();
    fromPromise(this.tabsService.getNoOfTodoItems()).subscribe(noOfTodoItems => {
      noOfTodoItems.subscribe(quantity => {
        this.noOfTodoItems = quantity;
      });
    });
  }

  private updateShowList(user) {
    const {
      teamId,
      hasReviews,
      hasEvents,
      chatEnabled,
    } = user;

    // only get the number of chats if user is in team
    if (teamId) {
      this.tabsService.getNoOfChats().subscribe(noOfChats => {
        this._noOfChats$.next(noOfChats);
      });
    }

    // display the chat tab if the user is in team
    if (!chatEnabled) {
      this._showChat$.next(false);
    } else if (teamId) {
      this._showChat$.next(true);
    } else {
      this._showChat$.next(false);
      this.switcherService.getTeamInfo().subscribe(() => {
        if (teamId) {
          this._showChat$.next(true);
        }
      });
    }
    if (hasReviews) {
      this._showReview$.next(true);
    } else {
      this._showReview$.next(false);
      this.reviewsService.getReviews().subscribe(data => {
        if (data.length) {
          this._showReview$.next(true);
        }
      });
    }

    if (hasEvents) {
      this._showEvents$.next(true);
    } else {
      this._showEvents$.next(false);
      this.eventsService.getEvents().subscribe(events => {
        this._showEvents$.next(!this.utils.isEmpty(events));
      });
    }
  }

  /**
   * highlight active tab (on focus)
   * @return void
   */
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

  /**
   * stop any playing video
   */
  private _stopPlayingVideos() {
    this.sharedService.stopPlayingVideos();
  }

  private _topicStopReading() {
    // if user looking at topic mark it stop reading before go back.
    this.sharedService.markTopicStopOnNavigating();
  }
}
