import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test.component';
import { AnimatedBattlefieldComponent } from './animation-battlefield/animation-battlefield.component';
import { AnimatedUnlockingComponent } from './animated-unlocking/animated-unlocking.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'animated-tick',
    component: AnimatedBattlefieldComponent,
  },
  {
    path: 'animated-unlocking',
    component: AnimatedUnlockingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
