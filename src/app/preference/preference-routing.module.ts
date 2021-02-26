import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferenceMobileComponent } from './preference-mobile/preference-mobile.component';
import { PreferenceUpdateComponent } from '@shared/components/preference-update/preference-update.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceMobileComponent,
  },
  {
    path: ':key',
    component: PreferenceUpdateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenceRoutingModule { }
