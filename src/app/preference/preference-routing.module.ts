import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferenceComponent } from './preference.component';
import { PreferenceRoutingComponent } from './preference-routing.component';
import { PreferenceUpdateComponent } from './preference-update/preference-update.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceRoutingComponent,
    children: [
    {
      path: '',
      component: PreferenceComponent
    },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenceRoutingModule { }
