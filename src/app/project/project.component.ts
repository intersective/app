import { Component, HostListener, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService, Milestone, DummyMilestone } from './project.service';
import { HomeService } from '../home/home.service';
import { RouterEnter } from '@services/router-enter.service';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss'],
})
export class ProjectComponent extends RouterEnter {
  public routeUrl = '/app/project';
  public programName: string;
  public milestones: Array<Milestone | DummyMilestone> = [];
  public loadingActivity = true;
  public loadingMilestone = true;
  public loadingProgress = true;
  @ViewChild('contentRef', {read: ElementRef}) contentRef: any;
  @ViewChildren('milestoneRef', {read: ElementRef}) milestoneRefs: QueryList<ElementRef>;
  public activeMilestone: Array<boolean> = [];

  constructor(
    public router: Router,
    public utils: UtilsService,
    public storage: BrowserStorageService,
    private projectService: ProjectService,
    private homeService: HomeService,
   ) {
    super(router);
  }

  private _initialise() {
    this.milestones = [{ dummy: true }];
    this.loadingActivity = true;
    this.loadingMilestone = true;
    this.loadingProgress = true;
  }

  onEnter() {
    this._initialise();
    this.homeService.getProgramName().subscribe(programName => {
      this.programName = programName;
    });

    this.projectService.getMilestones()
      .subscribe(milestones => {
        this.milestones = milestones;
        this.loadingMilestone = false;
        this.activeMilestone = new Array(milestones.length);
        this.activeMilestone.fill(false);
        this.activeMilestone[0] = true;
        this.projectService.getActivities(milestones)
          .subscribe(activities => {
            // remove entire Activity object with dummy data for clean Activity injection
            if (this.milestones) {
              this.milestones.forEach((milestone, i) => {
                if (this.utils.find(this.milestones[i].Activity, {dummy: true})) {
                  this.milestones[i].Activity = [];
                }
              });
            }

            this.milestones = this._addActivitiesToEachMilestone(this.milestones, activities);
            this.loadingActivity = false;
            this.projectService.getProgress(this.milestones).subscribe(progresses => {
              this.milestones = this._populateMilestoneProgress(progresses, this.milestones);
              this.loadingProgress = false;
            });
          });
      });
  }

  scrollTo(id, index) {
    // update active milestone status
    this.activeMilestone.fill(false);
    this.activeMilestone[index] = true;

    let el = document.getElementById(id);
    el.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });

    el.classList.add('highlighted');
    setTimeout(() => el.classList.remove('highlighted'), 1000);
  }

  goToActivity(id) {
    this.router.navigate(['app', 'activity', id]);
  }

  private _addActivitiesToEachMilestone(milestones, activities) {
    activities.forEach(activity => {
      const milestoneIndex = milestones.findIndex(milestone => {
        return milestone.id === activity.milestoneId;
      });
      milestones[milestoneIndex].Activity.push(activity);
    });
    return milestones;
  }

  private _populateMilestoneProgress(progresses, milestones) {
    progresses.Milestone.forEach(milestoneProgress => {
      const milestoneIndex = milestones.findIndex(milestone => {
        return milestone.id === milestoneProgress.id;
      });

      milestones[milestoneIndex].progress = milestoneProgress.progress;
      milestones[milestoneIndex].Activity.forEach((activity, activityIndex) => {
        const thisActivity = milestoneProgress.Activity.find(item => {
          return item.id === activity.id;
        });
        if (this.utils.has(thisActivity, 'progress')) {
          milestones[milestoneIndex].Activity[activityIndex].progress = thisActivity.progress;
        } else {
          milestones[milestoneIndex].Activity[activityIndex].progress = 0;
        }
      });
    });
    return milestones;
  }
}
