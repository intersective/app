import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  LocalNotificationEnabledResult } from '@capacitor/core';

const { PushNotifications, LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
  ) {}

  areEnabled(): Promise<LocalNotificationEnabledResult> {
    return LocalNotifications.areEnabled();
  }

  async schedule({
    title, content
  }) {
    const noti = await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body: content,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
        }
      ]
    });
    return noti;
  }
}
