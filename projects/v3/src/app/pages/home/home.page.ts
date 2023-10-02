import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Achievement, AchievementService } from '@v3/app/services/achievement.service';
import { ActivityService } from '@v3/app/services/activity.service';
import { AssessmentService } from '@v3/app/services/assessment.service';
import { ExperienceService } from '@v3/app/services/experience.service';
import { NotificationsService } from '@v3/app/services/notifications.service';
import { BrowserStorageService } from '@v3/app/services/storage.service';
import { Experience, HomeService, Milestone } from '@v3/services/home.service';
import { UtilsService } from '@v3/services/utils.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  display = 'activities';

  activityCount$ = this.homeService.activityCount$;
  experienceProgress: number;

  milestones: Milestone[];
  achievements: Achievement[];
  experience: Experience;

  subscriptions: Subscription[] = [];
  isMobile: boolean;
  activityProgresses = {};

  getIsPointsConfigured: boolean = false;
  getEarnedPoints: number = 0;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private achievementService: AchievementService,
    private activityService: ActivityService,
    private assessmentService: AssessmentService,
    private utils: UtilsService,
    private notification: NotificationsService,
    private experienceService: ExperienceService,
    private storageService: BrowserStorageService,
  ) { }

  ngOnInit() {
    this.isMobile = this.utils.isMobile();
    this.subscriptions = [];
    this.subscriptions.push(this.homeService.milestones$.pipe(
      distinctUntilChanged(),
      filter(milestones => milestones !== null),
    ).subscribe(
      res => {
        this.milestones = res;
      }
    ));
    this.subscriptions.push(this.achievementService.achievements$.subscribe(
      res => {
        this.achievements = res;
      }
    ));
    this.subscriptions.push(this.homeService.experienceProgress$.subscribe(
      res => {
        this.experienceProgress = res;
      }
    ));
    this.subscriptions.push(this.homeService.projectProgress$.pipe(
      filter(progress => progress !== null),
    ).subscribe(
      progress => {
        progress?.milestones.forEach(m => {
          m.activities.forEach(a => this.activityProgresses[a.id] = a.progress);
        });
      }
    ));

    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateDashboard();
        }
      })
    )
  }

  updateDashboard() {
    this.experience = this.storageService.get('experience');

    this.homeService.getMilestones();
    this.achievementService.getAchievements();
    this.homeService.getProjectProgress();

    this.getIsPointsConfigured = this.achievementService.getIsPointsConfigured();
    this.getEarnedPoints = this.achievementService.getEarnedPoints();

  }

  goBack() {
    this.router.navigate(['experiences']);
  }

  switchContent(event) {
    this.display = event.detail.value;
  }

  endingIcon(activity) {
    if (activity.isLocked) {
      return 'lock-closed';
    }
    const progress = this.activityProgresses[activity.id];
    if (!progress) {
      return 'chevron-forward';
    }
    if (progress === 1) {
      return 'checkmark-circle';
    }
    return null;
  }

  endingIconColor(activity) {
    const progress = this.activityProgresses[activity.id];
    if (!progress || activity.isLocked) {
      return 'medium';
    }
    if (progress === 1) {
      return 'success';
    }
    return null;
  }

  async gotoActivity(activity, keyboardEvent?: KeyboardEvent) {
    if (keyboardEvent && (keyboardEvent?.code === 'Space' || keyboardEvent?.code === 'Enter')) {
      keyboardEvent.preventDefault();
    } else if (keyboardEvent) {
      return;
    }

    if (activity.isLocked) {
      return ;
    }

    this.activityService.clearActivity();
    this.assessmentService.clearAssessment();

    const isAccessible = await this.homeService.isAccessible(activity.id);
    if (isAccessible === false) {
      return this.notification.alert({
        header: $localize`Team Activity`,
        message: $localize`Currently you are not in a team, please reach out to your Administrator or Coordinator to proceed with next steps.`,
        buttons: [
          {
            text: $localize`OK`,
            role: 'cancel',
          }
        ]
      });
    }

    if (!this.utils.isMobile()) {
      return this.router.navigate(['v3', 'activity-desktop', activity.id]);
    }
    return this.router.navigate(['v3', 'activity-mobile', activity.id]);
  }

  achievePopup(achievement: Achievement, keyboardEvent?: KeyboardEvent): void {
    if (keyboardEvent && (keyboardEvent?.code === 'Space' || keyboardEvent?.code === 'Enter')) {
      keyboardEvent.preventDefault();
    } else if (keyboardEvent) {
      return;
    }
    this.notification.achievementPopUp('', achievement);
  }

  endingProgress(activity): number {
    const progress = this.activityProgresses[activity.id];
    if (!progress || progress === 1) {
      return undefined;
    }
    return progress;
  }
}
