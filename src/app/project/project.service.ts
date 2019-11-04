import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  milestone: 'api/milestone.json',
  activity: 'api/activities.json',
  progress: 'api/v2/motivations/progress/list.json',
  overview: '/api/v2/plans/project/overview.json'
};

// added for displaying empty placeholder (enhance UX)
export interface DummyMilestone {
  dummy?: boolean;
  Activity?: Array<DummyActivity>;
}

export interface DummyActivity {
  dummy?: boolean;
}

export interface Activity {
  id: number;
  name: string;
  isLocked: boolean;
  leadImage?: string;
  progress?: number;
}

export interface Milestone {
  id: number;
  name: string;
  description?: string;
  isLocked: boolean;
  progress: number;
  Activity: Array <Activity | DummyActivity>;
}

@Injectable({
  providedIn: 'root',
})

export class ProjectService {
  public activities: Array<Activity> = [];

  constructor(
    private request: RequestService,
    private storage: BrowserStorageService,
    private utils: UtilsService
  ) { }

  public getProject() {
    return this.request.postGraphQL('"{milestones{id name progress description is_locked activities{id name progress is_locked lead_image }}}"')
      .pipe(map(res => this._normaliseProject(res.data)));
  }

  private _normaliseProject(data): Array<Milestone> {
    return data.milestones.map(m => {
      return {
        id: m.id,
        name: m.name,
        description: m.description,
        progress: m.progress,
        isLocked: m.is_locked,
        Activity: m.activities.map(a => {
          return {
            id: a.id,
            name: a.name,
            progress: a.progress,
            isLocked: a.is_locked,
            leadImage: a.lead_image
          };
        })
      };
    });
  }

  // get overview of statuses for the entire project
  public getOverview(): Observable<any> {
    const { projectId } = this.storage.getUser();
    return this.request.get(api.overview, {
      params: { id: projectId }
    });
  }

}
