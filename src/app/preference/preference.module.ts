import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';
import { PreferenceService } from './preference.service';

@NgModule({
  declarations: [PreferenceComponent, OptionsComponent, PreferenceUpdateComponent],
  imports: [
    CommonModule,
    PreferenceRoutingModule
  ],
  providers: [
    PreferenceService,
  ],
})
export class PreferenceModule { }
