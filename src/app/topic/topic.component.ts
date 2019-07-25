import { TopicService, Topic } from './topic.service';
import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router, ActivatedRoute } from '@angular/router';
import { FilestackService } from '@shared/filestack/filestack.service';
import { RouterEnter } from '@services/router-enter.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NotificationService } from '@shared/notification/notification.service';
import { ActivityService, Task } from '../activity/activity.service';
import { SharedService } from '@services/shared.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent extends RouterEnter {
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
    private sharedService: SharedService
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
  }

  onEnter() {
    this._initialise();
    this.id = +this.route.snapshot.paramMap.get('id');
    this.activityId = +this.route.snapshot.paramMap.get('activityId');
    this._getTopic();
    this._getTopicProgress();
  }

  private _getTopic() {
    this.topicService.getTopic(this.id)
      .subscribe(topic => {
        this.topic = topic;
        this.loadingTopic = false;
        if ( topic.videolink ) {
          this.iframeHtml = this.embedService.embed(this.topic.videolink);
        }
      });
  }

  private _getTopicProgress() {
    this.topicService.getTopicProgress(this.activityId, this.id)
      .subscribe(result => {
        this.topicProgress = result;
        if (this.topicProgress !== null && this.topicProgress !== undefined) {
          if (this.topicProgress === 1) {
            this.btnToggleTopicIsDone = true;
          }
        }
        this.loadingMarkedDone = false;
      });
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
   * @name continue
   * @description button action to trigger `nextStepPrompt`
   */
  async continue(): Promise<any> {
    // if topic has been marked as read
    if (this.btnToggleTopicIsDone) {
      return this.skipToNextTask();
    }

    // mark topic as done
    await this.markAsDone().toPromise();
    const navigation = await this.nextStepPrompt();
    return navigation;
  }

  /**
   * @name previewFile
   * @description open and preview file in a modal
   * @param {object} file filestack object
   */
  async previewFile(file) {
    if (this.isLoadingPreview === false) {
      this.isLoadingPreview = true;
      const filestack = await this.filestackService.previewFile(file);
      this.isLoadingPreview = false;
      return filestack;
    }
  }

  /**
   * @name navigateBySequence
   * @param {[type]} sequence [description]
   */
  private navigateBySequence(sequence, options?: {
    routeOnly?: boolean;
  }) {
    const { contextId, isForTeam, id, type } = sequence;
    let route = ['app', 'activity', this.activityId];

    switch (type) {
      case 'Assessment':
        route = ['assessment', 'assessment', this.activityId , contextId, id];
        break;
      case 'Topic':
        route = ['topic', this.activityId, id];
        break;
    }

    if (options && options.routeOnly) {
      return route;
    }

    return this.router.navigate(route);
  }


  private async getNextSequence(activity?) {
    let nextTask = null;
    const options = {
      id: this.id,
      teamId: this.storage.getUser().teamId
    };

    this.loadingTopic = true;
    if (!activity) {
      activity = await this.activityService.getTasksByActivityId(this.storage.getUser().projectId, this.activityId);
    }
    nextTask = this.activityService.findNext(activity.Tasks, options);
    this.loadingTopic = false;

    return nextTask;
  }

  // allow progression if milestone isnt completed yet
  async redirectToNextMilestoneTask(activity) {
    const nextTask = await this.getNextSequence(activity);

    switch (nextTask.type) {
      case 'assessment':
        return this.router.navigate(['assessment', 'assessment', activity.id, nextTask.context_id, nextTask.id]);

      case 'topic':
        return this.router.navigate(['topic', activity.id, nextTask.id]);
    }
    return this.router.navigate(['app', 'activity', activity.id]);
  }

  // get sequence detail and move on to next new task
  async skipToNextTask() {
    const activity = await this.activityService.getTasksByActivityId(this.storage.getUser().projectId, this.activityId);
    if (activity) {
      return this.redirectToNextMilestoneTask(activity);
    }

    return this.notificationService.customToast({
      message: 'Activity completed!',
      buttons: [
        {
          text: 'CONTINUE',
          handler: () => {
            return this.router.navigate(['app', 'project']);
          }
        }
      ]
    });
  }

  /**
   * @name nextStepPrompt
   * @description
   */
  async nextStepPrompt(): Promise<any> {
    await this.notificationService.customToast({
      message: 'Topic completed!'
    });
    return this.skipToNextTask();

    // code below will be skipped for temporary (until "unlock" feature implemented)
    /*return this.notificationService.alert({
      header: 'Activity completed!',
      message: 'You may now proceed to the next milestone.',
      buttons: [
        {
          text: 'Continue',
          handler: () => {
            return this.router.navigate(['app', 'project']);
          }
        }
      ]
    });

    return this.router.navigate(['app', 'activity', this.activityId]);*/
  }

  back() {
    if (this.btnToggleTopicIsDone) {
      return this.router.navigate(['app', 'activity', this.activityId]);
    }

    const type = 'Topic';
    return this.notificationService.alert({
      header: `Complete ${type}?`,
      message: 'Would you like to mark this task as done?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            return this.router.navigate(['app', 'activity', this.activityId]);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            return this.markAsDone().subscribe(() => {
              return this.notificationService.customToast({
                message: 'You\'ve completed the topic!'
              }).then(() => this.router.navigate([
                'app',
                'activity',
                this.activityId,
              ]));
            });
          }
        }
      ]
    });
  }

}
