import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/v3/home',
    pathMatch: 'full'
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'experiences',
    loadChildren: () => import('./pages/experiences/experiences.module').then(m => m.ExperiencesPageModule)
  },
  {
    path: 'v3',
    loadChildren: () => import('./pages/v3/v3.module').then( m => m.V3PageModule)
  },
  {
    path: 'activity-list',
    loadChildren: () => import('./pages/activity-list/activity-list.module').then( m => m.ActivityListPageModule)
  },
  {
    path: 'activity-detail',
    loadChildren: () => import('./pages/activity-detail/activity-detail.module').then( m => m.ActivityDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
