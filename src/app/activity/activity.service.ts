import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';
import { Event } from '@app/events/events.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  activity: 'api/activities.json',
  submissions: 'api/submissions.json',
  progress: 'api/v2/motivations/progress/list.json',
  events: 'api/v2/act/event/list.json'
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
}

export interface Activity {
  id: number;
  name: string;
  description?: string;
  tasks: Array<Task>;
}

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  constructor(
    private request: RequestService,
    private utils: UtilsService,
  ) {}

  getActivity(id: number): Observable<any> {
    return this.request.get(api.activity, {params: {id: id}})
      .pipe(map(response => {
        if (response.success && response.data) {
          return this._normaliseActivity(response.data);
        }
      })
    );
  }

  private _normaliseActivity(data: any) {
    // In API response, 'data' is an array of activities(since we passed activity id, it will return only one activity, but still in array format). That's why we use data[0]
    const thisActivity = data[0]; // grab first element from the array as activity

    if (!Array.isArray(data) || !this.utils.has(thisActivity, 'Activity') || !this.utils.has(thisActivity, 'ActivitySequence') || !this.utils.has(thisActivity, 'References')) {
      return this.request.apiResponseFormatError('Activity format error');
    }

    let activity: Activity = {
      id: 0,
      name: '',
      description: '',
      tasks: []
    };
    activity.id = thisActivity.Activity.id;
    activity.name = thisActivity.Activity.name;
    activity.description = thisActivity.Activity.description;

    let contextIds = {};
    thisActivity.References.forEach(element => {
      if (!this.utils.has(element, 'Assessment.id') || !this.utils.has(element, 'context_id')) {
        return this.request.apiResponseFormatError('Activity.References format error');
      }
      contextIds[element.Assessment.id] = element.context_id;
    });

    thisActivity.ActivitySequence.forEach(element => {
      if (this.utils.has(element, 'is_locked') && element.is_locked) {
        return activity.tasks.push({
          id: 0,
          type: 'Locked',
          name: 'Locked',
          loadingStatus: false
        });
      }
      if (!this.utils.has(element, 'model') || !this.utils.has(element, element.model)) {
        return this.request.apiResponseFormatError('Activity.ActivitySequence format error');
      }
      switch (element.model) {
        case 'Story.Topic':
          activity.tasks.push({
            id: element[element.model].id,
            name: element[element.model].title,
            type: 'Topic',
            loadingStatus: true
          });
          break;
        case 'Assess.Assessment':
          activity.tasks.push({
            id: element[element.model].id,
            name: element[element.model].name,
            type: 'Assessment',
            contextId: contextIds[element[element.model].id] || 0,
            loadingStatus: true,
            isForTeam: element[element.model].is_team
          });
          break;
      }
    });
    return activity;
  }

  getTasksProgress(activity: Activity): Observable<any> {
    return this.request.get(api.progress, {
        params: {
          model: 'Activity',
          model_id: activity.id,
          scope: 'Task'
        }
      })
      .pipe(map(response => {
        if (response.success && response.data) {
          return this._normaliseTasksProgress(response.data, activity.tasks);
        }
      })
    );
  }

  private _normaliseTasksProgress(data: any, tasks: Array<Task>) {
    if (!this.utils.has(data, 'Activity.Topic') && !this.utils.has(data, 'Activity.Assessment')) {
      return this.request.apiResponseFormatError('Progress.Activity format error');
    }
    let topicProgresses = {};
    let assessmentProgresses = {};
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

          if (tasks[index].progress == 1) {
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
        params:{
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

  private _normaliseAssessmentStatus(data: any, task: Task) {
    if (this.utils.isEmpty(data)) {
      task.status = '';
      task.loadingStatus = false;
      return task;
    }
    // In API response, 'data' is an array of submissions, but we only support one submission per assessment now. That's why we use data[0] - the first submission
    const thisSubmission = data[0];
    if (!Array.isArray(data) || !this.utils.has(thisSubmission, 'AssessmentSubmission')) {
      return this.request.apiResponseFormatError('Submission format error');
    }

    switch (thisSubmission.AssessmentSubmission.status) {
      case 'pending approval':
        task.status = 'pending review';
        break;

      case 'published':
        // default
        task.status = 'feedback available';
        task.feedbackReviewed = false;

        if (task.progress == 1) {
          task.status = 'done';
          task.feedbackReviewed = true;
        }
        break;

      default:
        task.status = thisSubmission.AssessmentSubmission.status;
        break;
    }
    task.loadingStatus = false;
    return task;
  }

  getEvents(activityId): Observable<any> {
    return this.request.get(api.events, {params: {
        type: 'activity_session',
        activity_id: activityId
      }})
      .pipe(map(response => {
        return this._normaliseEvents(response.data);
      })
    );
  }

  private _normaliseEvents(data): Array<Event> {
    if (!Array.isArray(data)) {
      this.request.apiResponseFormatError('Event format error');
      return [];
    }
    let events: Array<Event> = [];
    data.forEach(event => {
      if (!this.utils.has(event, 'id') ||
          !this.utils.has(event, 'title') ||
          !this.utils.has(event, 'description') ||
          !this.utils.has(event, 'activity_id') ||
          !this.utils.has(event, 'activity_name') ||
          !this.utils.has(event, 'location') ||
          !this.utils.has(event, 'start') ||
          !this.utils.has(event, 'end') ||
          !this.utils.has(event, 'capacity') ||
          !this.utils.has(event, 'remaining_capacity') ||
          !this.utils.has(event, 'isBooked')) {
        return this.request.apiResponseFormatError('Event object format error');
      }
      events.push({
        id: event.id,
        name: event.title,
        description: event.description,
        location: event.location,
        activityId: event.activity_id,
        activityName: event.activity_name,
        startTime: event.start,
        endTime: event.end,
        capacity: event.capacity,
        remainingCapacity: event.remaining_capacity,
        isBooked: event.isBooked,
        isPast: this.utils.timeComparer(event.start) < 0
      });
    });
    return this._sortEvent(events);
  }

  private _sortEvent(events) {
    return events.sort((a, b) => {
      let dateA = new Date(a.startTime + 'Z');
      let dateB = new Date(b.startTime + 'Z');
      if (dateA.getTime() === dateB.getTime()) {
        return 0;
      }
      return dateA.getTime() > dateB.getTime() ? -1 : 1;
    });
  }

}
