import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';

const api = {
  post: {
    reviewRating: 'api/v2/observations/review_rating/create.json',  
  }
};

export interface RatingData {
  assessment_review_id : number;
  rating : number;
	comment : string;
	tags : Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {

  constructor(
  	private request : RequestService,
  ) { }


  submitRating(data : RatingData) {
  	let postData = {
  		assessment_review_id: data.assessment_review_id,
      rating: data.rating,
      comment: data.comment,
      tags: data.tags
  	};
  
  	return this.request.post(api.post.reviewRating, postData);
  }

}
