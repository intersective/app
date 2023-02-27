import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '@v3/app/services/notifications.service';
import { Assessment, AssessmentReview, AssessmentService, Submission } from '@v3/app/services/assessment.service';
import { Review, ReviewService } from '@v3/app/services/review.service';
import { UtilsService } from '@v3/services/utils.service';
import { BehaviorSubject } from 'rxjs';

const SAVE_PROGRESS_TIMEOUT = 10000;

@Component({
  selector: 'app-review-desktop',
  templateUrl: './review-desktop.page.html',
  styleUrls: ['./review-desktop.page.scss'],
})
export class ReviewDesktopPage implements OnInit {
  loading: boolean; // loading indicator (true = loading | false = done loaded)
  savingText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  btnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  reviews: Review[];
  assessment: Assessment;
  submission: Submission;
  review: AssessmentReview;

  // the current review in the review list
  currentReview: Review;
  submissionId: number;
  noReview = false;


  constructor(
    readonly utils: UtilsService,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private reviewService: ReviewService,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.assessmentService.assessment$.subscribe(res => this.assessment = res);
    this.assessmentService.submission$.subscribe(res => this.submission = res);
    this.assessmentService.review$.subscribe(res => this.review = res);
    this.route.paramMap.subscribe(_params => {
      this.reviewService.getReviews();
    });
    this.route.params.subscribe(params => {
      this.submissionId = +params?.submissionId;
    });
    this.reviewService.reviews$.subscribe(reviews => {
      this.reviews = reviews;
      if (this.utils.isEmpty(this.submissionId) || this.submissionId == 0) {
        this.gotoFirstReview(reviews);
      } else if (reviews.length > 0) { // handle directlink
        this.goto(reviews.find(re => re.submissionId === this.submissionId));
      }
    });
  }

  /**
   * Go to the first review of the review list for desktop
   */
  gotoFirstReview(reviews: Review[]) {
    if (!reviews) {
      return ;
    }

    let review;
    if (this.submissionId) {
      // go to the review if submission id is passed in
      review = reviews.find(re => re.submissionId === this.submissionId);
    } else {
      // go to the first review if submission id is not passed in
      review = reviews.find(re => !re.isDone);
    }
    this.goto(review);
  }

  goto(review: Review) {
    if (!review) {
      this.noReview = true;
      return;
    }
    this.noReview = false;
    this.currentReview = review;
    this.assessmentService.getAssessment(review.assessmentId, 'review', 0, review.contextId, review.submissionId);
  }

  async saveAssessment(event) {
    if (event.assessment.inProgress && this.loading) {
      return;
    }
    this.loading = true;
    this.btnDisabled$.next(true);
    this.savingText$.next('Saving...');
    const res = await this.assessmentService.saveAnswers(
      event.assessment,
      event.answers,
      event.action,
      this.assessment.pulseCheck
    ).toPromise();

    // fail gracefully: Review submission API may sometimes fail silently
    if (res?.data?.submitReview === false) {
      this.savingText$.next($localize`Save failed.`);
      this.btnDisabled$.next(false);
      this.loading = false;
      return;
    }

    this.savingText$.next($localize`Last saved ${this.utils.getFormatedCurrentTime()}`);
    if (!event.assessment.inProgress) {
      setTimeout(
        () => {
          this.reviewService.getReviews();
          this.loading = false;
          this.btnDisabled$.next(false);
        },500
      );
    } else {
      setTimeout(() => {
        this.btnDisabled$.next(false);
        this.loading = false;
      }, SAVE_PROGRESS_TIMEOUT);
    }
  }

}
