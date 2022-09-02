import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReviewRatingService, ReviewRating } from '@v3/services/review-rating.service';
import { UtilsService } from '@v3/services/utils.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { FastFeedbackService } from '@v3/services/fast-feedback.service';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss']
})
export class ReviewRatingComponent {

  // Default redirect i.e home page.
  redirect = ['/'];

  ratingData: ReviewRating = {
    assessment_review_id: null,
    rating : 0.5,
    comment: '',
    tags: []
  };
  // variable to control the button text to indicate rating
  isSubmitting = false;

  constructor(
    private reviewRatingService: ReviewRatingService,
    private modalController: ModalController,
    private router: Router,
    private utils: UtilsService,
    private notificationsService: NotificationsService,
    readonly fastFeedbackService: FastFeedbackService,
  ) {}

  // Review ID is required if this component is to be used.upon detecting incoming/changes of value, set passed reviewId into local var
  @Input()
  set reviewId(reviewId: number) {
    this.ratingData.assessment_review_id = reviewId;
  }

  get isMobile() {
    return this.utils.isMobile();
  }

  submitReviewRating() {
    this.isSubmitting = true;
    // round to 2 decimal place
    this.ratingData.rating = +(this.ratingData.rating.toFixed(2));

    this.reviewRatingService.submitRating(this.ratingData).subscribe(
      result => {
        this.isSubmitting = false;
        this._closeReviewRating();
      },
      err => {
        const toasted = this.notificationsService.alert({
          header: 'Error submitting rating',
          message: err.msg || JSON.stringify(err)
        });

        throw new Error(err);
      }
    );
  }

  private async _closeReviewRating(): Promise<any> {
    this.modalController.dismiss();
    // if this.redirect == false, don't redirect to another page
    if (!this.redirect) {
      return this.fastFeedbackService.pullFastFeedback().toPromise();
    }

    if (!this.utils.isMobile()) {
      // go to the desktop view pages
      if (this.redirect.includes('assessment')) {
        return this.router.navigate([
          'v3',
          'activity',
          this.redirect[2],
          {
            task: 'assessment',
            task_id: this.redirect[4],
            context_id: this.redirect[3]
          }
        ]);
      }
      if (this.redirect.includes('topic')) {
        return this.router.navigate([
          'v3',
          'activity',
          this.redirect[1],
          {
            task: 'topic',
            task_id: this.redirect[2]
          }
        ]);
      }
    }

    return this.router.navigate(this.redirect);
  }

  addOrRemoveTags(tag) {
    this.ratingData.tags = this.utils.addOrRemove(this.ratingData.tags, tag);
  }

}
