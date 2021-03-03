import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesContainerComponent } from './preferences-container/preferences-container.component';
import { PreferenceRoutingComponent } from './preference-routing-component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceRoutingComponent,
    children: [
    {
      path: '',
      component: PreferencesContainerComponent
    },
    {
      path: ':key',
      component: PreferenceUpdateComponent
    }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenceRoutingModule { }
