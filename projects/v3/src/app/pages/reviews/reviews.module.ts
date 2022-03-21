import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsPageRoutingModule } from './reviews-routing.module';

import { ReviewsPage } from './reviews.page';
import { AssessmentPageModule } from '@v3/pages/assessment/assessment.module';
import { ReviewListPageModule } from '../review-list/review-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsPageRoutingModule,
    AssessmentPageModule,
    ReviewListPageModule,
  ],
  declarations: [ReviewsPage]
})
export class ReviewsPageModule {}
