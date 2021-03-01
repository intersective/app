import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PreferenceMobileComponent } from './preference-mobile/preference-mobile.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceModalComponent } from './preference-modal/preference-modal.component';
import { PreferenceService } from '@services/preference.service';
@NgModule({
  declarations: [
    PreferenceMobileComponent,
    OptionsComponent,
    PreferenceModalComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    PreferenceRoutingModule
  ],
  providers: [
    PreferenceService,
  ],
  exports: [
    SharedModule,
    CommonModule,
  ],
})
export class PreferenceModule { }
