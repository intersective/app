import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { first, map, shareReplay, tap } from 'rxjs/operators';
import { UtilsService } from '@v3/services/utils.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { Router } from '@angular/router';
import { ApolloService } from '@v3/services/apollo.service';
import { DemoService } from './demo.service';
import { environment } from '@v3/environments/environment';
import { TopicService } from './topic.service';
import { AssessmentService } from './assessment.service';
import { SharedService } from './shared.service';
import { UnlockIndicatorService } from './unlock-indicator.service';

export interface TaskBase {
  id: number;
  assessmentType: string;
  contextId: number;
  deadline: string;
  isLocked: boolean;
  isTeam: boolean;
  name: string;
  status: string;
  type: string;
}

export interface ActivityBase {
  id: number;
  name: string;
  description?: string;
  tasks: Array<TaskBase>;
}

export interface Activity {
  id: number;
  name: string;
  description?: string;
  tasks: Array<Task>;
}

export interface Task {
  id: number;
  type: string;
  name: string;
  status?: string;
  contextId?: number;
  isForTeam?: boolean;
  dueDate?: string;
  isOverdue?: boolean;
  isDueToday?: boolean;
  isLocked?: boolean;
  submitter?: {
    name: string;
    image: string;
  };
  assessmentType?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  private _activity$ = new BehaviorSubject<Activity>(null);
  activity$ = this._activity$.pipe(tap(activity => this.activity = activity), shareReplay(1));
  private _currentTask$ = new BehaviorSubject<Task>(null);
  currentTask$ = this._currentTask$.pipe(shareReplay(1));

  private activity: Activity;

  constructor(
    private demo: DemoService,
    private utils: UtilsService,
    public storage: BrowserStorageService,
    private router: Router,
    private notification: NotificationsService,
    private apolloService: ApolloService,
    private topic: TopicService,
    private assessment: AssessmentService,
    private sharedService: SharedService,
    private unlockIndicatorService: UnlockIndicatorService,
  ) {}

  public refreshActivity(data?): void {
    this._activity$.next(data || this._activity$.getValue());
  }

  getActivityBase(activityId: number | string, options?: {}): Observable<{
    data: {
      activity: ActivityBase
    }
  }> {
    return this.apolloService.graphQLFetch(
      `query getActivity($id: Int!) {
        activity(id:$id){
          id name description tasks{
            id name type isLocked isTeam deadline contextId assessmentType status{
              status isLocked submitterName submitterImage
            }
          }
        }
      }`,
      {
        variables: {
          id: +activityId
        }
      }
    );
  }

  /**
   * make API call for activity information
   *
   * @param   {number}  id            activity id
   * @param   {boolean}  goToNextTask  true to go to next task
   * @param   {Task}    afterTask     currently targeted task
   *
   * @return  {Subscription}                graphql watch
   */
  public getActivity(
    id: number, goToNextTask = false, afterTask?: Task, callback?: Function
  ) {
    if (environment.demo) {
      const taskId = afterTask ? afterTask.id : 0;
      return this.demo.activity(taskId).pipe(map(res => this._normaliseActivity(res.data, goToNextTask, afterTask))).subscribe(_res => {
        if (callback instanceof Function) {
          return callback(_res);
        }
        return;
      });
    }

    return this.getActivityBase(id).pipe(
      map(res => this._normaliseActivity(res.data, goToNextTask, afterTask)),
    ).subscribe(_res => {
      if (callback instanceof Function) {
        return callback(_res);
      }
      return;
    });
  }

  /**
   * Handle the activity response data
   * @param data The activity response data
   * @param goToNextTask Whether need to go to the first task (true for desktop view)
   * @param afterTask [Optional] Go to the first task after this task (only used along when goToNextTask is true)
   * @returns
   */
  private _normaliseActivity(data: any, goToNextTask: boolean, afterTask?: Task): Activity {
    if (!data) {
      return null;
    }

    // clone the return data, instead of modifying it
    const result = { ...data.activity };
    const tasks = result?.tasks?.filter(task => task.id !== null) // filter out null task
    .map(task => {
      if (task.isLocked) {
        return {
          id: 0,
          type: 'Locked',
          name: 'Locked'
        };
      }
      switch (task.type.toLowerCase()) {
        case 'topic':
          return {
            id: task.id,
            name: task.name,
            type: 'Topic',
            status: task.status.status
          };

        case 'assessment':
          const taskStatus = task.status;
          return {
            id: task.id,
            name: task.name,
            type: 'Assessment',
            contextId: task.contextId,
            isForTeam: task.isTeam,
            dueDate: task.deadline,
            isOverdue: task.deadline ? this.utils.timeComparer(task.deadline) < 0 : false,
            isDueToday: task.deadline ? this.utils.timeComparer(task.deadline, { compareDate: true }) === 0 : false,
            status: taskStatus?.status === 'pending approval' ? 'pending review' : taskStatus?.status,
            isLocked: taskStatus?.isLocked,
            submitter: {
              name: taskStatus?.submitterName,
              image: taskStatus?.submitterImage
            },
            assessmentType: task.assessmentType
          };
        default:
          console.warn(`Unsupported model type ${task.type}`);
          return {
            id: task.id,
            name: task.name,
            type: task.type
          };
      }
    });

    result.tasks = tasks;

    this._activity$.next(result);
    if (goToNextTask === true) {
      this.goToNextTask(afterTask);
    }
    return result;
  }

  /**
   * Go to the first unfinished task inside this activity,
   * or go to the next task after a specific task
   * @param tasks The list of tasks
   * @param afterTask Find the next task after this task
   */
  calculateNextTask(tasks: Task[], afterTask?: Task, callback?: Function) {
    // find the first accessible task that is not "done" or "pending review"
    let skipTask: boolean = !!afterTask;
    let nextTask: Task;
    let hasUnfinishedTask = false; // check if there is any unfinished task
    for (const task of tasks) {
      // if we need to find the first task after a specific task,
      // loop through the tasks array until we find this specific task
      if (skipTask) {
        if (afterTask.id === task.id && afterTask.type === task.type) {
          skipTask = false;
        }
        if (!['done', 'pending review'].includes(task.status)) {
          // flag to popup ActivityCompletePopUpComponent modal whenever
          // there is any unfinished task
          hasUnfinishedTask = true;
        }
        continue;
      }

      // if the accessible task is not locked (individual assessment)
      if (
        task.type !== 'Locked' && !task.isLocked && // not locked
        !(task.isForTeam && !this.storage.getUser().teamId) && // not a team assessment
        !(task.assessmentType === 'team360' && !this.storage.getUser().teamId) // not a team 360 assessment
      ) {
        // get the next task after a specific task
        if (afterTask) {
          nextTask = task;
          break;
        }

        // find the first unfinished task
        if (!['done', 'pending review'].includes(task.status)) {
          nextTask = task;
          break;
        }
      }
    }

    // if there is no next task
    if (!nextTask) {
      if (afterTask) {
        return this.assessment.fetchAssessment(
          afterTask.id,
          'assessment',
          this.activity.id,
          afterTask.contextId
        ).subscribe({
          next: () => {
            return this._activityCompleted(hasUnfinishedTask);
          },
          error: (err) => {
            console.error('Error fetching assessment::', err);
            return this._activityCompleted(hasUnfinishedTask);
          },
          complete: () => {
            if (callback instanceof Function) {
              return callback();
            }
          }
        });
      }
      nextTask = tasks[0]; // go to the first task
    }
    this.goToTask(nextTask);

    if (callback instanceof Function) {
      return callback();
    }
  }

  // obtain latest activity to decide next task
  goToNextTask(afterTask?: Task, callback?: Function) {
    return this.getActivity(this._activity$.getValue().id, false, null, (res: Activity) => {
      return this.calculateNextTask(res.tasks, afterTask, callback);
    });
  }

  private _activityCompleted(showPopup: boolean) {
    // check if we need to redirect user to external url
    const referrer = this.storage.getReferrer();
    if (this.utils.has(referrer, 'activityTaskUrl')) {
      this.utils.redirectToUrl(referrer.activityTaskUrl);
      return;
    }

    if (showPopup) {
      // pop up activity completed modal
      return this.notification.activityCompletePopUp(this.activity.id, false);
    }
    return this.router.navigate(['v3', 'home']);
  }

  async goToTask(task: Task, getData = true): Promise<void | Subscription | boolean> {
    // update teamId
    await this.sharedService.getTeamInfo().toPromise();

    this._currentTask$.next(task);

    // clear the task from the unlock indicator
    const cleared = this.unlockIndicatorService.removeTasks(task.id);
    cleared.forEach(clearedTask => {
      this.notification.markTodoItemAsDone(clearedTask).pipe(first()).subscribe();
    });

    if (!getData) {
      return ;
    }

    this.utils.setPageTitle(task.name);
    switch (task.type) {
      case 'Assessment':
        if (this.utils.isMobile()) {
          return this.router.navigate([
            'assessment-mobile',
            'assessment',
            this.activity.id,
            task.contextId,
            task.id
          ]);
        }

        try {
          const activity = await this.getActivityBase(this.activity.id)
            .pipe(
              map(res => this._normaliseActivity(res.data, false))
            ).toPromise();

          await this.assessment.fetchAssessment(task.id, 'assessment', activity.id, task.contextId).toPromise();
        } catch (error) {
          throw new Error(error);
        }
        break;

      case 'Topic':
        if (this.utils.isMobile()) {
          return this.router.navigate(['topic-mobile', this.activity.id, task.id]);
        }
        this.topic.getTopic(task.id);
        break;
    }
  }


  /**
   * @name nonTeamActivity
   * @description check if the activity is accessible by current
   *    user (team or individual assessment).
   *    When milestone contain only team assessment, only participant from a team
   *    can access the activities.
   *
   * @param   {number<boolean>}   activityId
   *
   * @return  {Promise<boolean>}  false when inaccessible, otherwise true
   */
  async nonTeamActivity(tasks?: Task[]): Promise<boolean> {
    const teamStatus = await this.sharedService.getTeamInfo().toPromise();
    if (teamStatus?.data?.user?.teams.length > 0) {
      return true;
    }

    const nonTeamAsmt = (tasks || [])
      .filter((task: Task) => task.isForTeam !== true);

    return nonTeamAsmt.length > 0;
  }
}
