import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NativeService } from './native.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
  ],
  providers: [
    NativeService
  ],
  exports: [
    NativeService
  ]
})
export class NativeModule {}
