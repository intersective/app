import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { TabsComponent } from './tabs.component';
import { HomeComponent } from '../home/home.component';
import { ProjectComponent } from '../project/project.component';
import { ActivityComponent } from '../activity/activity.component';
import { ChatComponent } from '../chat/chat.component';
import { HelpComponent } from '../help/help.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        outlet: 'home',
        canActivateChild: [AuthGuard],
        component: HomeComponent
      },
      {
        path: 'project',
        outlet: 'project',
        component: ProjectComponent
      },
      {
        path: 'activity/:id',
        outlet: 'activity',
        canActivateChild: [AuthGuard],
        component: ActivityComponent
      },
      {
        path: 'chat',
        outlet: 'chat',
        canActivateChild: [AuthGuard],
        component: ChatComponent
      },
      {
        path: 'help',
        outlet: 'help',
        component: HelpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
