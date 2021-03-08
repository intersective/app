import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PreferenceListRoutingModule } from './preference-list-routing.module';
import { PreferenceListRoutingComponent } from './preference-list-routing.component';
import { PreferenceListComponent } from './preference-list.component';

@NgModule({
  imports: [
    PreferenceListRoutingModule
  ],
  declarations: [
    PreferenceListRoutingComponent,
    PreferenceListComponent
  ],
  providers: [],
  exports: [
    PreferenceListComponent
  ]
})
export class PreferenceListModule {}
