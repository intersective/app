import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DescriptionComponent } from './description/description.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ImgComponent } from './img/img.component';
// import { FilestackModule } from './filestack/filestack.module';
import { DragAndDropDirective } from '../directives/drag-and-drop/drag-and-drop.directive';
import { AutoresizeDirective } from '../directives/autoresize/autoresize.directive';
import { FloatDirective } from '../directives/float/float.directive';
import { AchievementPopUpComponent } from './achievement-pop-up/achievement-pop-up.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { LockTeamAssessmentPopUpComponent } from './lock-team-assessment-pop-up/lock-team-assessment-pop-up.component';
import { ActivityCompletePopUpComponent } from './activity-complete-pop-up/activity-complete-pop-up.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // FilestackModule
  ],
  declarations: [
    DescriptionComponent,
    ListItemComponent,
    ImgComponent,
    DragAndDropDirective,
    AutoresizeDirective,
    FloatDirective,
    AchievementPopUpComponent,
    PopUpComponent,
    LockTeamAssessmentPopUpComponent,
    AchievementPopUpComponent,
    ActivityCompletePopUpComponent,
  ],
  exports: [
    DescriptionComponent,
    ListItemComponent,
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
  ],
})
export class ComponentsModule {}
