import { TopicService, Topic } from './topic.service';
import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router, ActivatedRoute } from '@angular/router';
import { FilestackService } from '@shared/filestack/filestack.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NotificationService } from '@shared/notification/notification.service';
import { ActivityService, Task, OverviewActivity, OverviewTask } from '../activity/activity.service';
import { SharedService } from '@services/shared.service';
import { Subscription, Observable } from 'rxjs';
import { NewRelicService } from '@shared/new-relic/new-relic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent extends RouterEnter {
  @Input() inputActivityId: number;
  @Input() inputId: number;
  @Output() navigate = new EventEmitter();
  routeUrl = '/topic/';
  topic: Topic = {
    id: 0,
    title: '',
    content: '',
    videolink: '',
    files: [],
    hasComments: false
  };
  iframeHtml = '';
  btnToggleTopicIsDone = false;
  loadingMarkedDone = true;
  loadingTopic = true;
  id = 0;
  activityId = 0;
  topicProgress: number;
  isLoadingPreview = false;
  isRedirectingToNextMilestoneTask: boolean;
  askForMarkAsDone: boolean;
  redirecting = false;

  constructor(
    private topicService: TopicService,
    private embedService: EmbedVideoService,
    public router: Router,
    private route: ActivatedRoute,
    private filestackService: FilestackService,
    public storage: BrowserStorageService,
    public utils: UtilsService,
    public notificationService: NotificationService,
    private activityService: ActivityService,
    private sharedService: SharedService,
    private ngZone: NgZone,
    private newRelic: NewRelicService
  ) {
    super(router);
  }

  private _initialise() {
    this.topic = {
      id: 0,
      title: '',
      content: '',
      videolink: '',
      files: [],
      hasComments: false
    };
    this.loadingMarkedDone = true;
    this.loadingTopic = true;
    this.btnToggleTopicIsDone = false;
    this.isRedirectingToNextMilestoneTask = false;
    this.askForMarkAsDone = false;
  }

  onEnter() {
    this._initialise();
    if (this.inputId) {
      this.id = this.inputId;
    } else {
      this.id = +this.route.snapshot.paramMap.get('id');
    }
    if (this.inputActivityId) {
      this.activityId = this.inputActivityId;
    } else {
      this.activityId = +this.route.snapshot.paramMap.get('activityId');
    }
    this._getTopic();
    this._getTopicProgress();
    setTimeout(() => this.askForMarkAsDone = true, 15000);
  }

  ionViewWillLeave() {
    this.sharedService.stopPlayingVideos();
  }

  private _getTopic() {
    this.topicService.getTopic(this.id)
      .subscribe(
        topic => {
          this.topic = topic;
          this.loadingTopic = false;
          if ( topic.videolink ) {
            this.iframeHtml = this.embedService.embed(this.topic.videolink);
          }
          this.newRelic.setPageViewName(`Topic ${this.topic.title} ID: ${this.topic.id}`);
        },
        err => {
          this.newRelic.noticeError(`${JSON.stringify(err)}`);
        }
      );
  }

  private _getTopicProgress() {
    this.topicService.getTopicProgress(this.activityId, this.id)
      .subscribe(
        result => {
          this.topicProgress = result;
          if (this.topicProgress !== null && this.topicProgress !== undefined) {
            if (this.topicProgress === 1) {
              this.btnToggleTopicIsDone = true;
            }
          }
          this.loadingMarkedDone = false;
        },
        err => {
          this.newRelic.noticeError(`${JSON.stringify(err)}`);
        }
      );
  }

  /**
   * @name markAsDone
   * @description set a topic as read by providing current id
   * @param {Function} callback optional callback function for further action after subcription is completed
   */
  markAsDone(callback?): Observable<any> {
    return this.topicService.updateTopicProgress(this.id).pipe(response => {
      // toggle event change should happen after subscription is completed
      this.btnToggleTopicIsDone = true;
      return response;
    });
  }

  /**
   * continue (mark as read) button
   * @description button action to trigger `redirectToNextMilestoneTask`
   */
  async continue(): Promise<any> {
    this.loadingTopic = true;

    // if topic has been marked as read
    if (this.btnToggleTopicIsDone) {
      return this.redirectToNextMilestoneTask({ continue: true });
    }

    // mark topic as done
    try {
      await this.markAsDone().toPromise();
    } catch (err) {
      await this.notificationService.alert({
        header: 'Error marking topic as completed.',
        message: err.msg || JSON.stringify(err)
      });
      this.loadingTopic = false;
      this.newRelic.noticeError(`${JSON.stringify(err)}`);
    }

    this.redirecting = true;
    this.loadingTopic = false;
    return setTimeout(
      async () => {
        const navigation = await this.redirectToNextMilestoneTask();
        this.redirecting = false;
        return navigation;
      },
      2000
    );
  }

  /**
   * @name previewFile
   * @description open and preview file in a modal
   * @param {object} file filestack object
   */
  async previewFile(file) {
    if (this.isLoadingPreview === false) {
      this.isLoadingPreview = true;

      try {
        const filestack = await this.filestackService.previewFile(file);
        this.isLoadingPreview = false;
        return filestack;
      } catch (err) {
        const toasted = await this.notificationService.alert({
          header: 'Error Previewing file',
          message: err.msg || JSON.stringify(err)
        });
        this.loadingTopic = false;
        this.newRelic.noticeError(`${JSON.stringify(err)}`);
      }
    }
  }

  private async getNextSequence(): Promise<{
    activity: OverviewActivity;
    nextTask: OverviewTask;
  }> {
    const options = {
      currentTaskId: this.id,
      teamId: this.storage.getUser().teamId
    };

    try {
      const {
        currentActivity,
        nextTask
      } = await this.activityService.getTasksByActivityId(
        this.storage.getUser().projectId,
        this.activityId,
        options
      );

      this.loadingTopic = false;
      return {
        activity: currentActivity,
        nextTask
      };
    } catch (err) {
      const toasted = await this.notificationService.alert({
        header: 'Project overview API Error',
        message: err.msg || JSON.stringify(err)
      });

      if (this.loadingTopic) {
        this.loadingTopic = false;
      }
      this.newRelic.noticeError(`${JSON.stringify(err)}`);
    }
  }

  // allow progression if milestone isnt completed yet
  async redirectToNextMilestoneTask(options: {
    continue?: boolean;
  } = {}): Promise<any> {
    if (options.continue === true) {
      this.isRedirectingToNextMilestoneTask = true;
    }

    const { activity, nextTask } = await this.getNextSequence();
    let route: any = ['app', 'overview'];

    if (this.activityId === activity.id && nextTask) {
      switch (nextTask.type) {
        case 'assessment':
          route = [
            'assessment',
            'assessment',
            activity.id,
            nextTask.context_id,
            nextTask.id
          ];
          break;

        case 'topic':
          route = ['topic', activity.id, nextTask.id];
          break;
      }
    }

    if (options.continue !== true && this.activityId !== activity.id) {
      await this.notificationService.alert({
        header: 'Congratulations!',
        message: 'You have successfully completed this activity.<br>Let\'s take you to the next one.',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
          }
        ]
      });
    }

    await this._navigate(route);
    return;
  }

  // force every navigation happen under radar of angular
  private _navigate(direction): Promise<boolean> {
    if (this.utils.isMobile()) {
      // redirect to topic/assessment page for mobile
      return this.ngZone.run(() => {
        return this.router.navigate(direction);
      });
    } else {
      // emit event to parent component(task component)
      switch (direction[0]) {
        case 'topic':
          this.navigate.emit({
            type: 'topic',
            topicId: direction[2]
          });
          break;
        case 'assessment':
          this.navigate.emit({
            type: 'assessment',
            contextId: direction[3],
            assessmentId: direction[4]
          });
          break;
        default:
          return this.ngZone.run(() => {
            return this.router.navigate(direction);
          });
      }
    }
  }

  back() {
    if (this.btnToggleTopicIsDone || !this.askForMarkAsDone) {
      return this._navigate([
        'app',
        'activity',
        this.activityId
      ]);
    }

    const type = 'Topic';
    return this.notificationService.alert({
      header: `Complete ${type}?`,
      message: 'Would you like to mark this task as done?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            return this._navigate(['app', 'activity', this.activityId]);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.newRelic.addPageAction('Mark as read before back');
            return this.markAsDone().subscribe(
              () => {
                return this.notificationService.presentToast({
                  message: 'You\'ve completed the topic!'
                }).then(() => this._navigate([
                  'app',
                  'activity',
                  this.activityId,
                ]));
              },
              err => {
                this.newRelic.noticeError(`${JSON.stringify(err)}`);
              });
          }
        }
      ]
    });
  }

}
