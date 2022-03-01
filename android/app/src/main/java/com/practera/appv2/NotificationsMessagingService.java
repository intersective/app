package com.practera.appv2;

import android.util.Log;

import com.google.firebase.messaging.RemoteMessage;
import com.pusher.pushnotifications.fcm.MessagingService;

public class NotificationsMessagingService extends MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.i("NotificationsService", "Got a remote message 🎉");
    }
}
