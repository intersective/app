import { NgModule } from '@angular/core';
import { PreferenceUpdateComponent } from './preference-update.component';
import { PreferenceUpdateRoutingModule } from './preference-update-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule ({
  imports: [
    PreferenceUpdateRoutingModule,
    SharedModule ],
  exports: [ PreferenceUpdateComponent ],
  declarations: [ PreferenceUpdateComponent ],
})
export class PreferenceUpdateModule { }
