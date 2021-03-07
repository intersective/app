import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PreferenceListComponent } from './preference-list/preference-list.component';
import { PreferenceRoutingModule } from './preference-routing.module';
import { OptionsComponent } from './options/options.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';
import { PreferenceService } from './preference.service';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingComponent } from './preference-routing.component';
import { PreferenceUpdateRoutingModule } from './preference-update/preference-update-routing.module';
import { PreferenceUpdateModule } from './preference-update/preference-update.module';



@NgModule({
  declarations: [
    OptionsComponent,
    PreferenceUpdateComponent,
    PreferenceComponent,
    PreferenceRoutingComponent,
    PreferenceListComponent,
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    PreferenceRoutingModule,
    PreferenceUpdateRoutingModule,
    PreferenceUpdateModule
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
