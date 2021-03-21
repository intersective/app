import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceService } from './preference.service';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingComponent } from './preference-routing.component';
import { PreferenceUpdateModule } from './preference-update/preference-update.module';
import { PreferenceListModule } from './preference-list/preference-list.module';
@NgModule({
  declarations: [
    OptionsComponent,
    PreferenceComponent,
    PreferenceRoutingComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    PreferenceRoutingModule,
    PreferenceUpdateModule,
    PreferenceListModule
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
