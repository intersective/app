import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  templateUrl: './device-info.component.html',
})

export class DeviceInfoComponent {
  path: string;
  currentWin: any;

  constructor(public platform: Platform) {
    console.log(this.platform);
    const {
      isLandscape,
      isRTL,
      isPortrait,
      platforms,
      testUserAgent,
      backButton,
      height,
      getQueryParam,
      url,
      width,
    } = this.platform;

    this.currentWin = {
      isLandscape,
      isRTL,
      isPortrait,
      platforms,
      testUserAgent,
      backButton,
      height,
      getQueryParam,
      url,
      width,
    };
  }
}
