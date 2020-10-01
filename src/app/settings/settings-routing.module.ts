import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsRoutingComponent } from './settings-routing.component';
import { SettingsComponent } from './settings.component';
import { SettingsResolverService } from './settings-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SettingsRoutingComponent,
    resolve: {
      user: SettingsResolverService,
    },
    children: [
      {
        path: '',
        component: SettingsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SettingsRoutingModule {}
