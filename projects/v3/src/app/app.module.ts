import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RequestInterceptor } from '@v3/services/request.interceptor';
import { IonicModule } from '@ionic/angular';
import { environment } from '@v3/environments/environment';
import { RequestModule } from 'request';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule } from 'apollo-angular';
import { ApolloService } from './services/apollo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true,
    }),
    RequestModule.forRoot({
      appkey: environment.appkey,
      prefixUrl: environment.APIEndpoint,
    }),
    ApolloModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    ApolloService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
