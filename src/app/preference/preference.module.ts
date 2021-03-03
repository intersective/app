import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PreferenceComponent } from './preference-list/preference.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';
import { PreferenceService } from './preference.service';
import { PreferencesContainerComponent } from './preferences-container/preferences-container.component';
import { PreferenceRoutingComponent } from './preference-routing.component';

@NgModule({
  declarations: [
    PreferenceComponent,
    OptionsComponent,
    PreferenceUpdateComponent,
    PreferencesContainerComponent,
    PreferenceRoutingComponent
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
