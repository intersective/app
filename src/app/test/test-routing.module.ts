import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './test.component';
import { AnimatedBattlefieldComponent } from './animation-battlefield/animation-battlefield.component';
import { AnimatedUnlockingComponent } from './animated-unlocking/animated-unlocking.component';
import { AnimationDrawingComponent } from './animation-drawing/animation-drawing.component';
import { DeviceInfoComponent } from './device-info/device-info.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'device-info',
    component: DeviceInfoComponent,
  },
  {
    path: 'animated-tick',
    component: AnimatedBattlefieldComponent,
  },
  {
    path: 'animated-unlocking',
    component: AnimatedUnlockingComponent,
  },
  {
    path: 'animation-drawing',
    component: AnimationDrawingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
