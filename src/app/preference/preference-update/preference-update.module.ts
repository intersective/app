import { NgModule } from '@angular/core';
import { PreferenceUpdateComponent } from './preference-update.component';
import { PreferenceUpdateRoutingModule } from './preference-update-routing.module';

@NgModule ({
  imports: [ PreferenceUpdateRoutingModule ],
  exports: [ PreferenceUpdateComponent ],
  declarations: [ PreferenceUpdateComponent ],
})
export class PreferenceUpdateModule { }