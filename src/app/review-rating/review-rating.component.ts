import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReviewRatingService, ReviewRating } from './review-rating.service';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '../shared/notification/notification.service';

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
    private notificationService: NotificationService
  ) {}

  // Review ID is required if this component is to be used.upon detecting incoming/changes of value, set passed reviewId into local var
  @Input()
  set reviewId(reviewId: number) {
    this.ratingData.assessment_review_id = reviewId;
  }

  submitReviewRating() {
    this.isSubmitting = true;
    // round to 2 decimal place
    this.ratingData.rating = +(this.ratingData.rating.toFixed(2));

    this.reviewRatingService.submitRating(this.ratingData).subscribe(result => {
      this.isSubmitting = false;
      this._closeReviewRating();
    });
  }

  private _closeReviewRating() {
    this.modalController.dismiss();
    // if this.redirect == false, don't redirect to another page
    if (this.redirect) {
      this.router.navigate(this.redirect);
    }
  }

  addOrRemoveTags(tag) {
    this.ratingData.tags = this.utils.addOrRemove(this.ratingData.tags, tag);
  }

}
