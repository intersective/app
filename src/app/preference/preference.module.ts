import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';
import { PreferenceModalComponent } from './preference-modal/preference-modal.component';
import { PreferenceUpdateModalComponent } from './preference-update-modal/preference-update-modal.component';
@NgModule({
  declarations: [
    PreferenceComponent,
    OptionsComponent,
    PreferenceUpdateComponent,
    PreferenceModalComponent,, PreferenceUpdateModalComponent
    ,
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    PreferenceRoutingModule,
  ],
  exports: [
    SharedModule,
    CommonModule,
  ],
})
export class PreferenceModule { }
