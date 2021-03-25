import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PreferenceListRoutingModule } from './preference-list-routing.module';
import { PreferenceListRoutingComponent } from './preference-list-routing.component';
import { PreferenceListComponent } from './preference-list.component';
import { PreferenceService } from '../preference.service';

@NgModule({
  imports: [
    SharedModule,
    PreferenceListRoutingModule
  ],
  declarations: [
    PreferenceListRoutingComponent,
    PreferenceListComponent
  ],
  providers: [
    PreferenceService
  ],
  exports: [
    PreferenceListComponent
  ]
})
export class PreferenceListModule {}

