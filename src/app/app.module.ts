import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { RequestModule } from '@shared/request/request.module'; 
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UtilsService } from './services/utils.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgCircleProgressModule],
=======
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule,
  	RequestModule.forRoot({ 
  		appkey: 'b11e7c189b',
  		prefixUrl: 'https://sandbox.practera.com/',
  	}),
  ],
>>>>>>> develop
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Custom
    UtilsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
