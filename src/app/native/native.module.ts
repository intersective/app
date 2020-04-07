import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NativeService } from './native.service';
import { PushNotificationService } from './push-notification.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
  ],
  providers: [
    NativeService,
    PushNotificationService
  ],
  exports: [
    NativeService,
    PushNotificationService
  ]
})
export class NativeModule {}
