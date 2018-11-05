import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { RequestConfig } from './request.service';
import { RequestService } from './request.service';
import { RequestInterceptor } from './request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    RequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
})
export class RequestModule {
  constructor(@Optional() @SkipSelf() parentModule: RequestModule) {
    if (parentModule) {
      throw new Error(
        'RequestModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: RequestConfig): ModuleWithProviders {
    return {
      ngModule: RequestModule,
      providers: [
        { provide: RequestConfig, useValue: config }
      ]
    };
  }
}
