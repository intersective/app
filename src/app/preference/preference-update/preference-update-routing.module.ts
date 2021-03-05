import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferenceUpdateComponent } from './preference-update.component';

const PreferenceUpdateRoutes: Routes = [
  { path: ':key',  component: PreferenceUpdateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(PreferenceUpdateRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PreferenceUpdateRoutingModule { }
