import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivityService, Activity } from './activity.service';
import { UtilsService } from '../services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { BrowserStorageService } from '@services/storage.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  
  id: number;
  activity: Activity = {
    id: 0,
    name: '',
    description: '',
    tasks: []
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private utils: UtilsService,
    private notificationService: NotificationService,
    private storage: BrowserStorageService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this._getActivity();
  }

  private _getActivity() {
    this.activityService.getActivity(this.id)
      .subscribe(activity => {
        this.activity = activity;
        this._getTasksProgress();
      });
  }

  private _getTasksProgress() {
    this.activityService.getTasksProgress(this.activity)
      .subscribe(tasks => {
        this.activity.tasks = tasks;
        this.activity.tasks.forEach((task, index) => {
          if(task.type == 'Assessment') {
            this._getAssessmentStatus(index);
          }
        });
      });
  }

  private _getAssessmentStatus(index) {
    this.activityService.getAssessmentStatus(this.activity.tasks[index])
      .subscribe(task => {
        this.activity.tasks[index] = task;
      });
  }

  back() {
    this.router.navigate(['app', { outlets: { project: 'project' } }]);
  }

  goto(type, id) {
    switch (type) {
      case 'Assessment':
        // get the context id of this assessment
        let contextId = 0;
        let isForTeam = false;
        this.utils.each(this.activity.tasks, task => {
          if (task.type === 'Assessment' && task.id == id) {
            contextId = task.contextId;
            isForTeam = task.isForTeam;
          }
        });
        if (isForTeam && !this.storage.getUser().teamId) {
          this.notificationService.popUp('shortMessage', {message: 'To do this assessment, you have to be in a team.'}, false);
          break;
        }
        this.router.navigate(['assessment', 'assessment', this.id , contextId, id]);
        break;
      case 'Topic':
        this.router.navigate(['topic', this.id, id]);
        break;
      case 'Locked':
        this.notificationService.popUp('shortMessage', {message: 'This part of the app is still locked. You can unlock the features by engaging with the app and completing all tasks.'}, false);
        break;
    }
  }

}
