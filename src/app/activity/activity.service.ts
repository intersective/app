import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { NotificationService } from '@shared/notification/notification.service';
import { Router } from '@angular/router';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  activity: 'api/activities.json',
  submissions: 'api/submissions.json',
  progress: 'api/v2/motivations/progress/list.json',
  nextTask: 'api/v2/plans/activity/next_task'
};

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
}

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  public tasks: Array<any>;

  constructor(
    private request: RequestService,
    private utils: UtilsService,
    public storage: BrowserStorageService,
    private router: Router,
    private notification: NotificationService
  ) {}

  // request for the latest data, and return the previously saved data at the same time
  public getActivity(id) {
    this._getActivityData(id).subscribe(res => this.utils.updateActivityCache(id, res));
    return this.utils.getActivityCache(id);
  }

  // request for the latest project data
  private _getActivityData(id) {
    return this.request.postGraphQL(
      `"{` +
        `activity(id:${id}){` +
          `id name description tasks{` +
            `id name type is_locked is_team deadline context_id status{` +
              `status is_locked submitter_name submitter_image` +
            `}` +
          `}` +
        `}` +
      `}"`)
      .pipe(map(res => this._normaliseActivity(res.data)));
  }

  private _normaliseActivity(data): Activity {
    data.activity.tasks = data.activity.tasks.map(task => {
      if (task.is_locked) {
        return {
          id: 0,
          type: 'Locked',
          name: 'Locked'
        };
      }
      switch (task.type) {
        case 'topic':
          return {
            id: task.id,
            name: task.name,
            type: 'Topic',
            status: task.status.status
          };

        case 'assessment':
          return {
            id: task.id,
            name: task.name,
            type: 'Assessment',
            contextId: task.context_id,
            isForTeam: task.is_team,
            dueDate: task.deadline,
            isOverdue: task.deadline ? this.utils.timeComparer(task.deadline) < 0 : false,
            isDueToday: task.deadline ? this.utils.timeComparer(task.deadline, { compareDate: true }) === 0 : false,
            status: task.status.status === 'pending approval' ? 'pending review' : task.status.status,
            isLocked: task.status.is_locked,
            submitter: {
              name: task.status.submitter_name,
              image: task.status.submitter_image
            }
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
    return data.activity;
  }

  /**
   * Go to the next task within the same activity, or go back to former layer
   * Logic:
   *  - If current task is not the last task in the activity, go to the next task
   *  - If current task is the last task in the activity and there's no unfinished task before the current task, go to the home page
   *  - If current task is the last task in the activity and there is unfinished task before the current task, show a pop up for user to choose whether go to the activity page or home page
   *
   * @param activityId Activity id
   * @param taskType   Current task type ('assessment'/'topic')
   * @param taskId     Current task id
   * @param justFinished Whether the current task is just finished or not
   */
  async gotoNextTask(activityId: number, taskType: string, taskId: number, justFinished = true): Promise<string[]> {
    const res = await this.getNextTask(activityId, taskType, taskId).toPromise();
    // go to next task
    if (!res.isLast) {
      // go to the next task
      let route = ['app', 'home'];
      switch (res.task.type) {
        case 'assessment':
          route = ['assessment', 'assessment', activityId.toString(), res.task.contextId.toString(), res.task.id.toString()];
          break;

        case 'topic':
          route = ['topic', activityId.toString(), res.task.id.toString()];
          break;
      }
      return route;
    }
    if (!res.task) {
      // pop up activity completed modal
      this.notification.activityCompletePopUp(activityId, justFinished);
      return ;
    }
    // go back to home page, and scroll to the activity
    if (justFinished) {
      // and display the toast
      this.router.navigate(['app', 'home'], { queryParams: { activityId: activityId, activityCompleted: true } });
    } else {
      // and don't display the toast
      this.router.navigate(['app', 'home'], { queryParams: { activityId: activityId } });
    }
  }

  /**
   * Get the data needed to find next task
   * @param activityId      The id of current activity
   * @param currentTaskType The type of current task
   * @param currentTaskId   The id of current task
   */
  getNextTask(activityId: number, currentTaskType: string, currentTaskId: number): Observable <{ isLast: boolean; task: Task; }> {
    return this.request.get(api.nextTask, {
        params: {
          activity_id: activityId,
          task_type: currentTaskType.toLowerCase(),
          task_id: currentTaskId
        }
      }).pipe(map(res => {
        return {
          isLast: res.data.is_last,
          task: !this.utils.isEmpty(res.data.task) ? {
            id: res.data.task.id,
            name: res.data.task.name,
            type: res.data.task.type,
            contextId: res.data.task.context_id || null
          } : null
        };
      })
    );
  }
}
