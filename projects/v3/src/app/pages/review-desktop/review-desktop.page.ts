import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService } from '@v3/app/services/assessment.service';
import { Review, ReviewService } from '@v3/app/services/review.service';
import { UtilsService } from '@v3/services/utils.service';

@Component({
  selector: 'app-review-desktop',
  templateUrl: './review-desktop.page.html',
  styleUrls: ['./review-desktop.page.scss'],
})
export class ReviewDesktopPage implements OnInit {
  review$ = this.assessmentService.review$;
  reviews$ = this.reviewService.reviews$;
  submission$ = this.assessmentService.submission$;
  assessment$ = this.assessmentService.assessment$;

  // the current review in the review list
  currentReview: Review;
  submissionId: number;
  noReview = false;


  constructor(
    readonly utils: UtilsService,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.submissionId = +this.route.snapshot.paramMap.get('submissionId');
    this.route.queryParams.subscribe(params => {
      this.reviewService.getReviews();
    });
    this.reviews$.subscribe(reviews => this.gotoFirstReview(reviews));
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

}
