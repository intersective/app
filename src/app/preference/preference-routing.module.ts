import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsPreferenceComponent } from './notifications-preference/notifications-preference.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPreferenceComponent,
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
