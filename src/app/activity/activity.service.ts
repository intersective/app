import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  activity: 'api/activities.json',
  submissions: 'api/submissions.json',
  progress: 'api/v2/motivations/progress/list.json',
  projectOverview: 'api/v2/plans/project/overview',
};

export interface Task {
  id: number;
  type: string;
  name: string;
  status?: string;
  progress?: number;
  contextId?: number;
  feedbackReviewed?: boolean;
  loadingStatus?: boolean;
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

export interface Activity {
  id: number;
  name: string;
  description?: string;
  tasks: Array<Task>;
}

export interface OverviewTask {
  is_locked: boolean;
  type: string;
  id: number;
  name: string;
  context_id?: number;
  status?: string;
  is_team?: boolean;
  progress: number;
  deadline: string;
  Submitter?: {
    id: number;
    name: string;
    email: string;
    image: string;
  };
}

export interface OverviewActivity {
  id: number;
  name: string;
  is_locked: boolean;
  Tasks?: Array<OverviewTask>;
}

export interface OverviewMilestone {
  id: number;
  name: string;
  is_locked: boolean;
  Activities: OverviewActivity[];
}

export interface Overview {
  id: number;
  name: string;
  Milestones: OverviewMilestone[];
}

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  public tasks: Array<any>;

  constructor(
    private request: RequestService,
    private utils: UtilsService,
  ) {}

  /**
   * loop through all milestone in current project
   * @param {OverviewMilestone[]} milestones object project overview api
   * @param {number} activityId activity id
   */
  private getCurrentActivity(milestones, activityId): {
    currentMilestoneIndex: number;
    currentMilestone: OverviewMilestone;
    currentActivity: OverviewActivity;
  } {
    let currentActivity: OverviewActivity;
    let currentMilestone: OverviewMilestone;

    // firstly, check current milestone
    const currentMilestoneIndex: number = milestones.findIndex(milestone => {
      const { Activities } = milestone;

      // find current activity
      currentActivity = Activities.find(activity => {
        if (activity.id === activityId) {
          return true;
        }
        return false;
      });

      // insert current milestone to "currentMilestone"
      if (currentActivity) {
        currentMilestone = milestone;
        return true;
      }

      return false;
    });

    return {
      currentMilestoneIndex,
      currentMilestone,
      currentActivity,
    };
  }

  /**
   * get next milestone unconditionally
   */
  private getNextMilestone(milestones, currentMilestone, currentMilestoneIndex) {
    let nextMilestone: OverviewMilestone;

    const nextMilestoneIndex = currentMilestoneIndex + 1; // skip checking current
    // get next milestone by the order of milestone array
    for (let i = nextMilestoneIndex, trial = 1; trial <= milestones.length; i++, trial++) {
      const milestoneIndex = i % milestones.length;
      if (nextMilestone === undefined) {
        nextMilestone = milestones[milestoneIndex];
      }
    }

    return nextMilestone;
  }

  /**
   * get next incompleted milestone only (status check is compulsory)
   */
  private getNextIncompletedMilestone(milestones, currentMilestone, currentMilestoneIndex) {
    let nextMilestone: OverviewMilestone;

    if (this.isMilestoneIncomplete(currentMilestone)) {
      return currentMilestone;
    }

    if (!this.isMilestoneIncomplete(currentMilestone)) {
      // get next milestone by the order of milestone array
      for (let i = currentMilestoneIndex, trial = 1; trial <= milestones.length; i++, trial++) {
        const milestoneIndex = i % milestones.length;
        if (this.isMilestoneIncomplete(milestones[milestoneIndex]) && nextMilestone === undefined) {
          nextMilestone = milestones[milestoneIndex];
        }
      }
    }

    return nextMilestone;
  }

  /**
   * this function has a little similarity to `getTasksByActivityId`.
   * The objective of getTaskStatusesForActivity, step by order:
   * 1) pull latest project overview API response
   * 2) evaluate by tasks completion status of current activity
   * 3) determine next incompleted task or indicate
   */
  async getCurrentActivityStatus(projectId: number, activityId: number) {
    const overview = await this.getOverview(projectId).toPromise();
    const { currentActivity } = this.getCurrentActivity(overview.Milestones, activityId);

    return currentActivity;
  }

  private _normaliseOverview(rawResponse: Overview): Overview {
    const milestones = rawResponse.Milestones;

    // make sure every activity is available
    const normalisedMilestones = milestones.filter(milestone => {
      if (milestone.Activities.length > 0) {
        return true;
      }

      return false;
    });

    return {
      id: rawResponse.id,
      name: rawResponse.name,
      Milestones: normalisedMilestones
    };
  }

  /**
   * Purpose: get next task (look for next incomplete milestone/activity/task),
   * this function will loop through entire status available in a project (from milestone to task-specific) to get the next incompleted task as next task to be redirected to
   *
   * combine all (get activity, progress for both topic and assessment) steps into one function
   * so we can access to tasks with progress information easily
   * @param  {number}       projectId project id
   * @param  {number}       activityId activity id
   * @return {Promise<any>}    Promise
   */
  async getTasksByActivityId(projectId: number, activityId: number, options: {
    currentTaskId: number;
    teamId: number;
  }): Promise<{
    currentActivity: OverviewActivity;
    nextTask: OverviewTask;
  }> {
    // project overview
    const overview = await this.getOverview(projectId).toPromise();

    // firstly, check current milestone
    const {
      currentMilestoneIndex,
      currentActivity,
      currentMilestone
    } = this.getCurrentActivity(overview.Milestones, activityId);

    // search next incompleted milestone
    const nextMilestone: OverviewMilestone = this.getNextIncompletedMilestone(
      overview.Milestones,
      currentMilestone,
      currentMilestoneIndex
    );

    let nextTask;

    // conditions: nextMilestone = undefined, means all milestone has been completed
    if (nextMilestone === undefined) {
      let nextActivity;
      // find next task
      nextTask = this.utils.getNextArrayElement(currentActivity.Tasks, options.currentTaskId);

      // find next activity
      if (nextTask === undefined) {
        nextActivity = this.utils.getNextArrayElement(currentMilestone.Activities, currentActivity.id);
      } else {
        nextActivity = currentActivity;
      }

      // find next milestone
      if (nextActivity === undefined) {
        const nextUnconditionalMilestone = this.getNextMilestone(
          overview.Milestones,
          currentMilestone,
          currentMilestoneIndex
        );

        return {
          // first task and activity in the milestone as next
          currentActivity: nextUnconditionalMilestone.Activities[0],
          nextTask: nextUnconditionalMilestone.Activities[0].Tasks[0],
        };
      } else {
        nextTask = this.utils.getNextArrayElement(nextActivity.Tasks, options.currentTaskId);
      }

      return {
        currentActivity: nextActivity,
        nextTask,
      };
    }

    let incompletedActivity;
    // skip only if current activity is completed
    if (this.isActivityIncomplete(currentActivity)) {
      nextTask = this.findNext(currentActivity.Tasks, options);
    } else {
      // if nextMilestone not present, use currentMilestone as backup
      incompletedActivity = nextMilestone.Activities.find(activity => {
        if (this.isActivityIncomplete(activity)) {
          return true;
        }
        return false;
      });

      nextTask = this.findNext(incompletedActivity.Tasks, options);
    }

    return {
      currentActivity: incompletedActivity || currentActivity,
      nextTask,
    };
  }

  /**
   * get actuvity from API response, and inject proper statuses to each of the activity.
   * @param  {number}          id activityId
   * @return {Observable<any>}
   */
  getActivity(id: number): Observable<any> {
    return this.request.get(api.activity, {params: {id: id}})
      .pipe(map(response => {
        if (response.success && response.data) {
          return this._normaliseActivity(response.data);
        }
      })
    );
  }

  private _extractTasks(thisActivity) {
    const contextIds = this.getContextAssessment(thisActivity);

    const tasks = thisActivity.ActivitySequence.map(sequence => {
      if (this.utils.has(sequence, 'is_locked') && sequence.is_locked) {
        return {
          id: 0,
          type: 'Locked',
          name: 'Locked',
          loadingStatus: false
        };
      }

      if (!this.utils.has(sequence, 'model') || !this.utils.has(sequence, sequence.model)) {
        this.request.apiResponseFormatError('Activity.ActivitySequence format error');
        return {};
        // throw new Error('Activity.ActivitySequence format error');
      }

      switch (sequence.model) {
        case 'Story.Comm':
        case 'Story.Topic':
          return {
            id: sequence[sequence.model].id,
            name: sequence[sequence.model].title,
            type: 'Topic',
            loadingStatus: true
          };

        case 'Assess.Assessment':
          return {
            id: sequence[sequence.model].id,
            name: sequence[sequence.model].name,
            type: 'Assessment',
            contextId: contextIds[sequence[sequence.model].id] || 0,
            loadingStatus: true,
            isForTeam: sequence[sequence.model].is_team,
            dueDate: sequence[sequence.model].deadline,
            isOverdue: sequence[sequence.model].deadline ? this.utils.timeComparer(sequence[sequence.model].deadline) < 0 : false,
            isDueToday: sequence[sequence.model].deadline ? this.utils.timeComparer(sequence[sequence.model].deadline, undefined, true) === 0 : false,
          };
        default:
          console.warn(`Unsupported model type ${sequence.model}`);
          return {
            id: sequence[sequence.model].id,
            name: sequence[sequence.model].title,
            type: sequence.model,
            loadingStatus: true
          };
      }
    });
    return tasks;
  }

  public _normaliseOverviewTasks(tasks: OverviewTask[]) {
    const result = tasks.map(task => {
      if (task.is_locked) {
        return {
          id: 0,
          type: 'Locked',
          name: 'Locked',
          loadingStatus: false
        };
      }

      switch (task.type) {
        case 'topic':
          return {
            id: task.id,
            name: task.name,
            type: 'Topic',
            loadingStatus: true
          };

        case 'assessment':
          return {
            id: task.id,
            name: task.name,
            type: 'Assessment',
            contextId: task.context_id || 0,
            loadingStatus: true,
            isForTeam: task.is_team,
            dueDate: task.deadline,
            isOverdue: task.deadline ? this.utils.timeComparer(task.deadline) < 0 : false,
            isDueToday: task.deadline ? this.utils.timeComparer(task.deadline, undefined, true) === 0 : false,
          };
      }
    });
    return result;
  }

  private getContextAssessment(thisActivity) {
    const contextIds = {};
    thisActivity.References.forEach(element => {
      if (!this.utils.has(element, 'Assessment.id') || !this.utils.has(element, 'context_id')) {
        return this.request.apiResponseFormatError('Activity.References format error');
      }
      contextIds[element.Assessment.id] = element.context_id;
    });
    return contextIds;
  }

  private _normaliseActivity(data: any) {
    // In API response, 'data' is an array of activities
    // (since we passed activity id, it will return only one activity, but still in array format).
    // That's why we use data[0]
    const thisActivity = data[0];

    if (!Array.isArray(data) || !this.utils.has(thisActivity, 'Activity') || !this.utils.has(thisActivity, 'ActivitySequence') || !this.utils.has(thisActivity, 'References')) {
      return this.request.apiResponseFormatError('Activity format error');
    }

    const activity: Activity = {
      id: 0,
      name: '',
      description: '',
      tasks: []
    };
    activity.id = thisActivity.Activity.id;
    activity.name = thisActivity.Activity.name;
    activity.description = thisActivity.Activity.description;

    activity.tasks = this._extractTasks(thisActivity);
    return activity;
  }

  /**
   * get and inject progress value (from 0 to 1) for each task
   * @param  {Activity}        activity object
   * @param  {object}          options model & model_id & scope
   * @return {Observable<any>}
   */
  getTasksProgress(options: {
    model_id: number; // model id
    model?: string;
    scope?: string;
    tasks?: Task[];
  }): Observable<any> {
    const params = {
      model_id: options.model_id,
      model: options.model || 'Activity',
      scope: options.scope || 'Task',
    };

    return this.request.get(api.progress, { params })
      .pipe(map(response => {
        if (response.success && response.data) {
          if (options.tasks) {
            return this._normaliseTasksProgress(response.data, options.tasks);
          }

          return response;
        }
      })
    );
  }

  private _normaliseTasksProgress(data: any, tasks: Array<Task>): Task[] | void {
    if (!this.utils.has(data, 'Activity.Topic') && !this.utils.has(data, 'Activity.Assessment')) {
      return this.request.apiResponseFormatError('Progress.Activity format error');
    }

    const topicProgresses = {};
    const assessmentProgresses = {};
    if (this.utils.has(data, 'Activity.Topic')) {
      data.Activity.Topic.forEach(topic => {
        if (!this.utils.has(topic, 'id') || !this.utils.has(topic, 'progress')) {
          return this.request.apiResponseFormatError('Progress.Activity.Topic format error');
        }
        topicProgresses[topic.id] = topic.progress;
      });
    }

    if (this.utils.has(data, 'Activity.Assessment')) {
      data.Activity.Assessment.forEach(assessment => {
        if (!this.utils.has(assessment, 'id') || !this.utils.has(assessment, 'progress')) {
          return this.request.apiResponseFormatError('Progress.Activity.Assessment format error');
        }
        assessmentProgresses[assessment.id] = assessment.progress;
      });
    }

    tasks.forEach((task, index) => {
      switch (task.type) {
        case 'Topic':
          tasks[index].progress = topicProgresses[task.id] || 0;
          tasks[index].status = '';
          tasks[index].loadingStatus = false;

          if (tasks[index].progress === 1) {
            tasks[index].status = 'done';
          }
          break;
        case 'Assessment':
          tasks[index].progress = assessmentProgresses[task.id] || 0;
          break;
      }
    });
    return tasks;
  }

  getAssessmentStatus(task: Task): Observable<any> {
    return this.request.get(api.submissions, {
        params: {
          assessment_id: task.id,
          context_id: task.contextId
        }
      })
      .pipe(map(response => {
        if (response.success && response.data) {
          return this._normaliseAssessmentStatus(response.data, task);
        }
      }));
  }

  // when not done (empty status/feedback available/)
  private isTaskCompleted(task: OverviewTask): boolean {
    // Topic/Assessment: when it's 'not started', we dont care progress value
    if (task.type === 'assessment' && task.status === 'not started') {
      return false;
    }

    // is_locked: take is_locked story as "completed" for now (so we skip to the next one)
    // progress: 0 = not done, 1 = marked as read (done)
    if (task.is_locked || task.progress === 1) {
      return true;
    }

    // Assessment: 'done' and 'progress=0' can be coexistent
    if (task.type === 'assessment' && ['pending review', 'done', 'pending approval'].indexOf(task.status) !== -1 && task.progress !== 1) {
      return true;
    }

    // potential status: "in progress"/"feedback available"
    return false;
  }

  /**
   * get next task from the provided list of tasks based on array's order
   * @param  {Task[]}     tasks task list
   * @param  {object}     options current taskId and teamId
   * @return {Task}       single task object
   */
  findNext(tasks: OverviewTask[], options: {
    currentTaskId: number;
    teamId: number;
  }): OverviewTask {
    // currentIndex can be -1 because the tasks list can be from different Activity's tasks set
    const currentIndex = tasks.findIndex(task => {
      return task.id === options.currentTaskId;
    });

    const nextIndex = currentIndex + 1;
    if (currentIndex !== -1 && tasks[nextIndex] && !this.isTaskCompleted(tasks[nextIndex])) {
      return tasks[nextIndex];
    }

    // condition: if next task is a completed activity, pick the first undone from the list
    const prioritisedTasks = tasks.filter(task => {
      // avoid team assessment if user isn't in a team
      if (task.is_team && !options.teamId) {
        console.warn('user isn\'t in a team.');
        return false;
      }

      return !this.isTaskCompleted(task);
    });
    return prioritisedTasks[0];
  }

  private _normaliseAssessmentStatus(data: any, task: Task) {
    if (this.utils.isEmpty(data)) {
      task.status = '';
      task.loadingStatus = false;
      return task;
    }
    // In API response, 'data' is an array of submissions,
    // but we only support one submission per assessment now.
    // That's why we use data[0] - the first submission
    const thisSubmission = data[0];
    if (!Array.isArray(data) || !this.utils.has(thisSubmission, 'AssessmentSubmission') || !this.utils.has(thisSubmission, 'Submitter')) {
      return this.request.apiResponseFormatError('Submission format error');
    }

    // getting submitter name, image and lock or unlock for team assessment.
    task.isLocked = thisSubmission.AssessmentSubmission.is_locked;
    task.submitter = {
      name : thisSubmission.Submitter.name,
      image : thisSubmission.Submitter.image
    };

    // standardize and restrict statuses into 3 main categorises
    // eg. (pending review / feedback available / done)
    switch (thisSubmission.AssessmentSubmission.status) {
      case 'pending approval':
      case 'pending review':
        task.status = 'pending review';
        break;

      case 'published':
        // default
        task.status = 'feedback available';
        task.feedbackReviewed = false;

        if (task.progress === 1) {
          task.status = 'done';
          task.feedbackReviewed = true;
        }
        break;

      case 'done':
        task.status = 'done';
        break;

      default:
        // Potential status: '' (empty string) / 'in progress'
        task.status = thisSubmission.AssessmentSubmission.status;

        if (['', 'in progress'].indexOf(task.status) === -1) {
          console.warn(`Potential incompatible assessment status: ${thisSubmission.AssessmentSubmission.status}`);
        }
        break;
    }
    task.loadingStatus = false;
    return task;
  }

  /**
   * definition of incomplete:
   * - for assessment, submission could be done, but hasn't review or awaiting feedback
   * - for topic, hasn't marked as read
   * @param {[type]} assessment [description]
   */
  isActivityIncomplete(assessment): boolean {
    const { Tasks } = assessment;

    const hasIncompletedTask = Tasks.filter(task => {
      if (task.type === 'assessment') {
        if (task.status === 'not started') {
          return true;
        }

        // don't include 'pending review/pending approval'
        return (task.progress < 1 && (task.status === 'published' || task.status === 'in progress' || task.status === 'feedback available' || task.status === ''));
      }

      return task.progress < 1;
    });

    return hasIncompletedTask.length > 0;
  }

  isMilestoneIncomplete(milestone): boolean {
    const { Activities } = milestone;
    const isIncompleted = Activities.filter(activity => {
      return this.isActivityIncomplete(activity);
    });
    return isIncompleted.length > 0;
  }

  // get overview of statuses for the entire project
  getOverview(projectId: number): Observable<Overview> {
    return this.request.get(api.projectOverview, {
      params: { id: projectId }
    }).pipe(map(res => this._normaliseOverview(res.data)));
  }
}
