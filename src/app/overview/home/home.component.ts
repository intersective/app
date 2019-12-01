import { Component, OnDestroy } from '@angular/core';
import { HomeService, TodoItem } from './home.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FastFeedbackService } from '../../fast-feedback/fast-feedback.service';
import { Activity } from '../project/project.service';
import { UtilsService } from '@services/utils.service';
import { Subscription } from 'rxjs';
import { BrowserStorageService } from '@services/storage.service';
import { RouterEnter } from '@services/router-enter.service';
import { PusherService } from '@shared/pusher/pusher.service';
import { Achievement, AchievementsService } from '@app/achievements/achievements.service';
import { Event, EventListService } from '@app/event-list/event-list.service';
import { Intercom } from 'ng-intercom';
import { environment } from '@environments/environment';
import { NewRelicService } from '@shared/new-relic/new-relic.service';
import { trigger, state, transition, style, animate, useAnimation } from '@angular/animations';
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [
    trigger('newLoaded', [
      transition(':enter, * => 0, * => -1', [
        useAnimation(fadeIn, {
          params: { time: '250ms' }
        })
      ]),
    ]),
  ]
})
export class HomeComponent implements OnDestroy {
  routeUrl = '/app/home';
  progress = 0;
  loadingProgress = true;
  todoItems: Array<TodoItem> = [];
  eventReminders: Array<Event> = [];
  loadingTodoItems = true;
  activity: Activity;
  loadingActivity = true;
  subscriptions: Subscription[] = [];
  achievements: Array<Achievement>;
  progressConfig: any;

  constructor(
    private intercom: Intercom,
    public router: Router,
    private homeService: HomeService,
    private fastFeedbackService: FastFeedbackService,
    public utils: UtilsService,
    public storage: BrowserStorageService,
    public achievementService: AchievementsService,
    private route: ActivatedRoute,
    private eventsService: EventListService,
    private newRelic: NewRelicService
  ) {
    const role = this.storage.getUser().role;
    this.utils.getEvent('notification').subscribe(event => {
      const todoItem = this.homeService.getTodoItemFromEvent(event);
      if (!this.utils.isEmpty(todoItem)) {
        // add todo item to the list if it is not empty
        this.todoItems.push(todoItem);
      }
    });
    this.utils.getEvent('team-message').subscribe(event => {
      this.homeService.getChatMessage().subscribe(chatMessage => {
        if (!this.utils.isEmpty(chatMessage)) {
          this._addChatTodoItem(chatMessage);
        }
      });
    });
    this.utils.getEvent('event-reminder').subscribe(event => {
      this.homeService.getReminderEvent(event).subscribe(session => {
        if (!this.utils.isEmpty(session)) {
          this.eventReminders.push(session);
        }
      });
    });
    if (role !== 'mentor') {
      this.utils.getEvent('team-no-mentor-message').subscribe(event => {
        this.homeService.getChatMessage().subscribe(chatMessage => {
          if (!this.utils.isEmpty(chatMessage)) {
            this._addChatTodoItem(chatMessage);
          }
        });
      });
    }

    this.route.params.subscribe(params => {
      this.onEnter();
    });
  }

  private _initialise() {
    this.todoItems = [];
    this.eventReminders = [];
    this.loadingTodoItems = true;
    this.loadingProgress = true;
    this.loadingActivity = true;
    this.achievements = [];
  }

  onEnter() {
    this._initialise();
    this.subscriptions.push(
      this.homeService.getTodoItems().subscribe(todoItems => {
        this.todoItems = this.todoItems.concat(todoItems);
        this.loadingTodoItems = false;
      })
    );
    // only get the number of chats if user is in team
    if (this.storage.getUser().teamId) {
      this.subscriptions.push(
        this.homeService.getChatMessage().subscribe(chatMessage => {
          if (!this.utils.isEmpty(chatMessage)) {
            this._addChatTodoItem(chatMessage);
          }
          this.loadingTodoItems = false;
        })
      );
    }
    this.subscriptions.push(
      this.homeService.getProgress().subscribe(progress => {
        this.progress = progress;
        this.progressConfig = {percent: progress};
        this.loadingProgress = false;
        this.homeService.getCurrentActivity().subscribe(activity => {
          if (activity.id) {
            this.activity = activity;
            this.loadingActivity = false;
          }
        });
      })
    );

    this.subscriptions.push(
      this.achievementService.getAchievements('desc').subscribe(achievements => {
        const earned = [];
        const unEarned = [];
        achievements.forEach(item => {
          if (item.isEarned === false) {
            unEarned.push(item);
          } else {
            earned.push(item);
          }
        });

        if (achievements.length <= 3) {
          this.achievements = achievements;
        } else if (!earned.length || earned.length === achievements.length) {
          this.achievements = achievements;
          this.achievements.length = 3;
        } else if (earned.length === 1 && unEarned.length > 1) {
          this.achievements[0] = earned[0];
          this.achievements[1] = unEarned[0];
          this.achievements[2] = unEarned[1];
        } else if (earned.length > 1 && unEarned.length > 0) {
          this.achievements[0] = earned[0];
          this.achievements[1] = earned[1];
          this.achievements[2] = unEarned[0];
        }
      })
    );

    if (typeof environment.intercom !== 'undefined' && environment.intercom === true) {
      this.intercom.boot({
        app_id: environment.intercomAppId,
        name: this.storage.getUser().name, // Full name
        email: this.storage.getUser().email, // Email address
        user_id: this.storage.getUser().id, // current_user_id
        // Supports all optional configuration.
        widget: {
          'activator': '#intercom'
        }
      });
    }

    this.fastFeedbackService.pullFastFeedback().subscribe();
  }

  goTo(destination) {
    this.router.navigate(destination);
  }

  goToActivity(id) {
    this.newRelic.actionText(`goToActivity ID: ${id}`);
    this.router.navigate(['app', 'activity', id]);
  }

  goToAssessment(activityId, contextId, assessmentId) {
    this.newRelic.actionText('goToAssessment');
    if (this.utils.isMobile()) {
      this.router.navigate([
        'assessment',
        'assessment',
        activityId,
        contextId,
        assessmentId
      ]);
    } else {
      this.router.navigate([
        'app',
        'activity',
        activityId,
        {
          task: 'assessment',
          task_id: assessmentId,
          context_id: contextId
        }
      ]);
    }
  }

  goToReview(contextId, assessmentId, submissionId) {
    this.newRelic.actionText('goToReview');
    this.router.navigate([
      'assessment',
      'review',
      contextId,
      assessmentId,
      submissionId
    ]);
  }

  goToChat(todoItem?: TodoItem) {
    this.newRelic.actionText('goToChat');
    if (this.utils.isEmpty(todoItem.meta)) {
      return this.router.navigate(['app', 'chat']);
    }
    if (todoItem.meta.team_member_id) {
      return this.router.navigate(['chat', 'chat-room', todoItem.meta.team_id, todoItem.meta.team_member_id]);
    }
    return this.router.navigate(['chat', 'chat-room', 'team', todoItem.meta.team_id, todoItem.meta.participants_only]);
  }

  ngOnDestroy(): void {
    // run ngOnDestroy from RouterEnter
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _addChatTodoItem(chatTodoItem) {
    let currentChatTodoIndex = -1;
    const currentChatTodo = this.todoItems.find((todoItem, index) => {
      if (todoItem.type === 'chat') {
        currentChatTodoIndex = index;
        return true;
      }
    });
    if (currentChatTodo) {
      this.todoItems.splice(currentChatTodoIndex, 1);
    }
    this.todoItems.push(chatTodoItem);
  }

  showEventDetail(event) {
    this.newRelic.actionText('showEventDetail');
    if (this.utils.isMobile()) {
      this.eventsService.eventDetailPopUp(event);
    } else {
      // go to the events page with the event selected
      this.router.navigate(['app', 'events', {event_id: event.id}]);
    }
  }

}
