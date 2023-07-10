import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '@v3/app/services/notifications.service';
import { BrowserStorageService } from '@v3/app/services/storage.service';
import { ActivityService, Task } from '@v3/services/activity.service';
import { AssessmentService, Assessment, Submission, AssessmentReview } from '@v3/services/assessment.service';
import { UtilsService } from '@v3/app/services/utils.service';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from '@v3/app/services/review.service';

const SAVE_PROGRESS_TIMEOUT = 10000;

@Component({
  selector: 'app-assessment-mobile',
  templateUrl: './assessment-mobile.page.html',
  styleUrls: ['./assessment-mobile.page.scss'],
})
export class AssessmentMobilePage implements OnInit {
  assessment: Assessment;
  submission: Submission;
  review: AssessmentReview;
  activityId: number;
  contextId: number;
  submissionId: number;
  action: string;
  fromPage: string;
  savingText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  btnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saving: boolean;

  currentTask: Task;

  @ViewChild('assessmentEle') assessmentEle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assessmentService: AssessmentService,
    private activityService: ActivityService,
    private readonly storageService: BrowserStorageService,
    private notificationsService: NotificationsService,
    private readonly utils: UtilsService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit() {
    this.assessmentService.assessment$.subscribe(res => this.assessment = res);
    this.assessmentService.submission$.subscribe(res => this.submission = res);
    this.assessmentService.review$.subscribe(res => this.review = res);
    this.route.params.subscribe(params => {
      this.action = this.route.snapshot.data.action;
      this.fromPage = this.route.snapshot.data.from;
      if (!this.fromPage) {
        this.fromPage = this.route.snapshot.paramMap.get('from');
      }
      this.activityId = +params.activityId || 0;
      this.contextId = +params.contextId;
      this.submissionId = +params.submissionId;
      this.assessmentService.getAssessment(+params.id, this.action, this.activityId, this.contextId, this.submissionId);
    });
  }

  get restrictedAccess() {
    return this.storageService.singlePageAccess;
  }

  get task() {
    return {
      id: this.assessment.id,
      type: 'Assessment',
      name: this.assessment.name,
      status: ''
    };
  }

  async continue() {
    if (!this.currentTask) {
      this.currentTask = this.task;
    }
    if (this.currentTask.status === 'done') {
      // just go to the next task without any other action
      return this.activityService.goToNextTask(null, this.currentTask);
    }
    // get the latest activity tasks and navigate to the next task
    return this.activityService.getActivity(this.activityId, true, this.currentTask);
  }

  goBack() {
    this.assessmentEle.btnBackClicked();
    if (this.fromPage === 'reviews') {
      return this.router.navigate(['v3', 'reviews']);
    }
    if (!this.activityId) {
      return this.router.navigate(['v3', 'home']);
    }
    return this.router.navigate(['v3', 'activity-mobile', this.activityId]);
  }

  async saveAssessment(event) {
    if (event.saveInProgress && this.saving) {
      return;
    }

    this.saving = true;
    this.btnDisabled$.next(true);
    this.savingText$.next('Saving...');

    try {
      if (this.action === 'assessment') {
        await this.assessmentService.submitAssessment(
          event.submissionId,
          event.assessmentId,
          event.contextId,
          event.answers
        ).toPromise();

        if (this.assessment.pulseCheck === true && event.saveInProgress === false) {
          await this.assessmentService.pullFastFeedback();
        }
      } else if (this.action === 'review') {
        await this.assessmentService.submitReview(
          event.assessmentId,
          this.review.id,
          event.submissionId
        ).toPromise();

        this.reviewService.getReviews();
      }

      this.savingText$.next($localize `Last saved ${this.utils.getFormatedCurrentTime()}`);
      if (!event.saveInProgress) {
        this.notificationsService.assessmentSubmittedToast();
        // get the latest activity tasks and refresh the assessment submission data
        this.activityService.getActivity(this.activityId);
        this.btnDisabled$.next(false);
        this.saving = false;
        return this.assessmentService.getAssessment(this.assessment.id, this.action, this.activityId, this.contextId, this.submissionId);
      } else {
        setTimeout(() => {
          this.btnDisabled$.next(false);
          this.saving = false;
        }, SAVE_PROGRESS_TIMEOUT);
      }
    } catch (err) {
      this.btnDisabled$.next(false);
      this.saving = false;
      this.notificationsService.assessmentSubmittedToast(false);
    }
  }

  async readFeedback(event) {
    await this.assessmentService.saveFeedbackReviewed(event).toPromise();
    await this.reviewRatingPopUp();
    // get the latest activity tasks and navigate to the next task
    return this.activityService.getActivity(this.activityId, true, this.task);
  }

  nextTask() {
    this.activityService.goToNextTask(null, this.task);
  }

  async reviewRatingPopUp(): Promise<void> {
    if (this.storageService.getUser().hasReviewRating === false) {
      return;
    }

    try {
      // display review rating modal
      return await this.notificationsService.popUpReviewRating(this.review.id, false);
    } catch (err) {
      const header = $localize`Can not get review rating information`;
      await this.notificationsService.alert({
        header,
        message: err.msg || JSON.stringify(err)
      });
      throw new Error(err);
    }
  }
}
