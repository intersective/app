import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';
import { Task } from '../activity/activity.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  milestone: 'api/milestone.json',
  activity: 'api/activities.json',
  progress: 'api/v2/motivations/progress/list.json'
};


export interface Activity {
  id: number;
  name: string;
  milestoneId?: number;
  isLocked: boolean;
  leadImage?: string;
  progress: number;
  tasks?: Array <Task>
}

export interface Milestone {
  id: number;
  name: string;
  description?: string;
  isLocked: boolean;
  progress: number;
  Activity: Array <Activity>;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public milestones: Array<Milestone> = [];
  public milestone_ids: Array<number> = [];
  public activities: Array<Activity> = [];
  
  constructor( 
    private request: RequestService,
    private utils: UtilsService) { }
  
  public getMilestones() {
    return this.request.get(api.milestone)
    .pipe(map(response => {
      if (response.success && response.data) {
        return this._normaliseMilestones(response.data);
      }
    }));
  }
  
  private _normaliseMilestones(data){
    
    if (!Array.isArray(data)) {
      this.request.apiResponseFormatError('Milestones array format error');
      return [];
    }
    this.milestones = [];
    this.milestone_ids = [];
    data.forEach(eachMilestone => {
      if (!this.utils.has(eachMilestone, 'id') || 
          !this.utils.has(eachMilestone, 'name') || 
          !this.utils.has(eachMilestone, 'is_locked')) {
        return this.request.apiResponseFormatError('Milestone format error');
      }
      let milestone: Milestone = {
        id: 0,
        name: '',
        description: '',
        isLocked: false,
        progress: 0,
        Activity:[]
      };
      milestone.id = eachMilestone.id;
      milestone.name = eachMilestone.name;
      milestone.isLocked = eachMilestone.is_locked;
      if (this.utils.has(eachMilestone, 'description')) {
        milestone.description = eachMilestone.description;
      };
      
      this.milestones.push(milestone);
      
  });
  this.milestones.forEach(milestone => {
    if (!milestone.isLocked) {
      this.milestone_ids.push(milestone.id);
    }
  });

  this._getActivities().subscribe(activities => { 
    
    this.activities = activities; 
    this._addActivitiesToEachMilestone(this.milestones, this.activities);
    this.milestone_ids.forEach(id => {
      this._getProgress(id, this.milestones).subscribe();
    });
    
  });
  
  return this.milestones;
  }

  private _addActivitiesToEachMilestone(milestones,activities) {
    
    milestones.forEach(function(eachMilestone) {
      activities.forEach( function (activity) {
        if (activity.milestoneId === eachMilestone.id) {
          eachMilestone.Activity.push(activity);
        }
     });
  });
}
  
  public _getActivities() {
    return this.request.get(api.activity, {
      params: {
        milestone_id: JSON.stringify(this.milestone_ids)
      }
    })
    .pipe(map(response => {
      if (response.success && response.data) {
        return this._normaliseActivities(response.data);
      }
    }));
  }

  private _normaliseActivities(data: any) {
    
    let activities: Array<Activity> = [];
    if (!Array.isArray(data)) {
      this.request.apiResponseFormatError('Activities array format error');
      return [];
    }
    
    data.forEach(eachActivity => {
      if (!this.utils.has(eachActivity, 'Activity')) {
        return this.request.apiResponseFormatError('Activity.Activity format error');
      }
      if (this.utils.has(eachActivity, 'Activity') && eachActivity.Activity.is_locked === false ) {
        if (!this.utils.has(eachActivity, 'ActivitySequence')) {
          return this.request.apiResponseFormatError('ActivitySequence format error');
        }
      }
      let activity: Activity = {
        id: 0,
        name: '',
        milestoneId: 0,
        isLocked: false,
        leadImage: '',
        progress: 0,
        tasks: []
      }
      let thisActivity = eachActivity.Activity;

      activity.id = thisActivity.id;
      activity.name = thisActivity.name;
      activity.isLocked = thisActivity.is_locked;

      if (this.utils.has(thisActivity, 'lead_mage')) {
        activity.leadImage = thisActivity.lead_image;
      }
      if (!thisActivity.isLocked) {
        activity.milestoneId = thisActivity.milestone_id;
      }
       activities.push(activity);
    })
    return activities;
  }
  
  public _getProgress(id, milestones) {
    return this.request.get(api.progress, {
      params: {
        model: 'Milestone',
        model_id: id,
        scope: 'Task'
      }
    })
    .pipe(map(response => {
      if (response.success && response.data) {
        return this._normaliseProgress(response.data,milestones);
      }
    }))
  }

  private _normaliseProgress(data: any, milestones) {
    
    if (!this.utils.has(data, 'Milestone')) {
      this.request.apiResponseFormatError('Progress format error');
      return 0;
    }

    this._milestoneProgress(data,milestones);
    
  }

  private _milestoneProgress(data,milestones) {

    let findMilestone = milestones.find(function (milestone) {
      return milestone.id === data.Milestone.id });

    findMilestone.progress = data.Milestone.progress;
    this._activityProgress(data,findMilestone);

  }

  private _activityProgress(data,milestone) {
    data.Milestone.Activity.forEach(function(activity){
      var findActivityWithThisId = milestone.Activity.find(function(item) {
        return item.id === activity.id;
      })
      findActivityWithThisId.progress = activity.progress;
    })
    return milestone;
  }
}