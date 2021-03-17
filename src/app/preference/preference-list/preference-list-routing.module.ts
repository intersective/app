import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferenceListComponent } from './preference-list.component';
import { PreferenceListRoutingComponent } from './preference-list-routing.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceListRoutingComponent,
    children: [
      {
        path: '',
        component: PreferenceListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferenceListRoutingModule {}
