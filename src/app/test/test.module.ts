import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { AnimatedBattlefieldComponent } from './animation-battlefield/animation-battlefield.component';
import { AnimatedUnlockingComponent } from './animated-unlocking/animated-unlocking.component';
import { AnimationDrawingComponent } from './animation-drawing/animation-drawing.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { TestRoutingModule } from './test-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TestRoutingModule,
    SharedModule,
  ],
  declarations: [
    TestComponent,
    AnimatedBattlefieldComponent,
    AnimatedUnlockingComponent,
    AnimationDrawingComponent,
    DeviceInfoComponent,
  ],
  exports: [
    IonicModule,
    CommonModule,
    SharedModule,
  ]
})
export class TestModule {}
