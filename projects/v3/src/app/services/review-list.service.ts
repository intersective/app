import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestService } from 'request';
import { UtilsService } from '@v3/services/utils.service';
import { DemoService } from './demo.service';
import { environment } from '@v3/environments/environment';

const api = {
  reviews: 'api/reviews.json',
};

export interface Review {
  assessmentId: number;
  submissionId: number;
  isDone: boolean;
  name: string;
  submitterName: string;
  date?: string;
  teamName?: string;
  contextId: number;
  status: string;
  icon: string;
  title: string;
  submitter: string;
  team: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewListService {
  private _reviews$ = new BehaviorSubject<Review[]>([]);
  reviews$ = this._reviews$.asObservable();

  constructor(
    private request: RequestService,
    private utils: UtilsService,
    private demoService: DemoService,
  ) { }

  getReviews() {
    if (environment.demo) {
      return this.demoService.getReviews().pipe(map(response => {
        if (response.success && response.data) {
          return this._reviews$.next(this._normaliseReviews(response.data));
        } else {
          return [];
        }
      })).subscribe();
    }

    return this.request.get(api.reviews)
      .pipe(map(response => {
        if (response.success && response.data) {
          return this._reviews$.next(this._normaliseReviews(response.data));
        } else {
          return [];
        }
      })
    );
  }

  private _normaliseReviews(data): Review[] {
    if (!Array.isArray(data)) {
      throw this.request.apiResponseFormatError('Reviews format error');
    }

    const reviews = [];
    data.forEach(review => {
      if (!this.utils.has(review, 'Assessment.id') ||
          !this.utils.has(review, 'Assessment.name') ||
          !this.utils.has(review, 'AssessmentReview.is_done') ||
          !this.utils.has(review, 'AssessmentSubmission.Submitter.name') ||
          !this.utils.has(review, 'AssessmentSubmission.context_id') ||
          !this.utils.has(review, 'AssessmentSubmission.id') ||
          !this.utils.has(review, 'AssessmentReview.created') ||
          !this.utils.has(review, 'AssessmentReview.modified')) {
        return this.request.apiResponseFormatError('Reviews object format error');
      }
      reviews.push({
        assessmentId: review.Assessment.id,
        submissionId: review.AssessmentSubmission.id,
        isDone: review.AssessmentReview.is_done,
        name: review.Assessment.name,
        submitterName: review.AssessmentSubmission.Submitter.name,
        date: this.utils.timeFormatter(review.AssessmentReview.is_done ? review.AssessmentReview.modified : review.AssessmentReview.created),
        teamName: this.utils.has(review, 'AssessmentSubmission.Team.name') ? review.AssessmentSubmission.Team.name : '',
        contextId: review.AssessmentSubmission.context_id
      });
    });
    return reviews;
  }


}
