import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentService, AssessmentReview } from '@v3/app/services/assessment.service';
import { ReviewService } from '@v3/app/services/review.service';
import { UtilsService } from '@v3/services/utils.service';

@Component({
  selector: 'app-review-desktop',
  templateUrl: './review-desktop.page.html',
  styleUrls: ['./review-desktop.page.scss'],
})
export class ReviewDesktopPage implements OnInit {
  currentReview$ = this.assessmentService.review$;
  reviews$ = this.reviewService.reviews$;
  submission$ = this.assessmentService.submission$;
  assessment$ = this.assessmentService.assessment$;

  currentReview: AssessmentReview = {
    id: 0,
    answers: {},
    status: '',
    modified: '',
  };
  doAssessment = false;

  constructor(
    readonly utils: UtilsService,
    private route: ActivatedRoute,
    private assessmentService: AssessmentService,
    private reviewService: ReviewService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reviewService.getReviews();
    });
  }

  get isMobile() {
    return this.utils.isMobile();
  }

  goto(currentReview) {
    this.assessmentService.getAssessment(11150, 'review', 1, 1);
  }
}