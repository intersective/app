import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { combineLatest, Observable, of } from 'rxjs';
import { FastFeedbackService } from '../fast-feedback/fast-feedback.service';

import { FCM } from 'capacitor-fcm';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  isMobile: boolean;
  programName: string;
  initiator$ = this.route.params;
  fcm: any;

  constructor(
    private storage: BrowserStorageService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private fastFeedbackService: FastFeedbackService,
  ) {
    this.isMobile = this.utils.isMobile();
    this.fcm = new FCM();

  }

  async ngOnInit() {
    this.initiator$.subscribe(() => {
      this.programName = this.storage.getUser().programName;
      this.fastFeedbackService.pullFastFeedback().subscribe();
    });

    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.register()
      .then(() => {
        //
        // Subscribe to a specific topic
        // you can use `FCMPlugin` or just `fcm`
        this.fcm
          .subscribeTo({ topic: "test" })
          .then(r => alert(`subscribed to topic`))
          .catch(err => console.log(err));
      })
      .catch(err => alert(JSON.stringify(err)));

    this.fcm
      .unsubscribeFrom({ topic: "test" })
      .then(() => alert(`unsubscribed from topic`))
      .catch(err => console.log(err));

    //
    // Get FCM token instead the APN one returned by Capacitor
    this.fcm
      .getToken()
      .then(r => {
        alert(`Token ${r.token}`);
        console.log(r);
        console.log('token:', r.token);
      })
      .catch(err => console.log(err));

    //
    // Remove FCM instance
    this.fcm
      .deleteInstance()
      .then(() => alert(`Token deleted`))
      .catch(err => console.log(err));
  }
}
