import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DescriptionComponent } from './description/description.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CircleProgressComponent } from './circle-progress/circle-progress.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ImgComponent } from './img/img.component';
// import { FilestackModule } from './filestack/filestack.module';
import { DragAndDropDirective } from '../directives/drag-and-drop/drag-and-drop.directive';
import { AutoresizeDirective } from '../directives/autoresize/autoresize.directive';
import { FloatDirective } from '../directives/float/float.directive';
import { AchievementPopUpComponent } from './achievement-pop-up/achievement-pop-up.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { LockTeamAssessmentPopUpComponent } from './lock-team-assessment-pop-up/lock-team-assessment-pop-up.component';
import { ActivityCompletePopUpComponent } from './activity-complete-pop-up/activity-complete-pop-up.component';
import { FastFeedbackComponent } from './fast-feedback/fast-feedback.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { PersonalisedHeaderComponent } from './personalised-header/personalised-header.component';
// import { QuestionsModule } from '../questions/questions.module';

const largeCircleDefaultConfig = {
  backgroundColor: 'var(--ion-color-light)',
  subtitleColor: 'var(--ion-color-dark-tint)',
  showInnerStroke: false,
  startFromZero: false,
  outerStrokeColor: 'var(--ion-color-primary)',
  innerStrokeColor: 'var(--ion-color-primary)',
  subtitle: [
    'COMPLETE'
  ],
  animation: true,
  animationDuration: 1000,
  titleFontSize: '32',
  subtitleFontSize: '18',
};
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgCircleProgressModule.forRoot(largeCircleDefaultConfig),
  ],
  declarations: [
    DescriptionComponent,
    ListItemComponent,
    CircleProgressComponent,
  ],
  exports: [
    DescriptionComponent,
    ListItemComponent,
    CircleProgressComponent,
    IonicModule,
    CommonModule,
    FormsModule,
    ImgComponent,
    DragAndDropDirective,
    AutoresizeDirective,
    FloatDirective,
    AchievementPopUpComponent,
    PopUpComponent,
    LockTeamAssessmentPopUpComponent,
    AchievementPopUpComponent,
    ActivityCompletePopUpComponent,
    FastFeedbackComponent,
    ReviewRatingComponent,
    PersonalisedHeaderComponent,
  ],
})
export class ComponentsModule {}
