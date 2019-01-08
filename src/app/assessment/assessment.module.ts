import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AssessmentComponent } from './assessment.component';
import { QuestionsModule } from '../questions/questions.module';
import { FastFeedbackModule } from '../fast-feedback/fast-feedback.module';

@NgModule({
  imports: [
    FastFeedbackModule,
    AssessmentRoutingModule,
    QuestionsModule
  ],
  declarations: [
    AssessmentComponent
  ],
})

export class AssessmentModule {
}
