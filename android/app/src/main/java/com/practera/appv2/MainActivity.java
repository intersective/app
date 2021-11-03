package com.practera.appv2;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.RemoteMessage;
import com.practera.capacitor.custom.CustomNativePlugin;
import com.practera.capacitor.pusherbeams.PusherBeamsPlugin;
import com.pusher.pushnotifications.PushNotificationReceivedListener;
import com.pusher.pushnotifications.PushNotifications;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    PushNotifications.start(getApplicationContext(), "c0ba349e-66c6-440d-8ac7-fe229709d088");
    PushNotifications.addDeviceInterest("general");

    registerPlugin(PusherBeamsPlugin.class);
    registerPlugin(CustomNativePlugin.class);
  }

  @Override
  public void onResume() {
    super.onResume();
    PushNotifications.setOnMessageReceivedListenerForVisibleActivity(this, new PushNotificationReceivedListener() {
        @Override
        public void onMessageReceived(RemoteMessage remoteMessage) {
          // @POTENTIAL_INAPP_PUSH_NOTIFICATION
          String messagePayload = remoteMessage.getData().get("inAppNotificationMessage");
          if (messagePayload == null) {
            // Message payload was not set for this notification
            Log.i("PracteraAction", "Payload was missing");
          } else {
            Log.i("PracteraAction", messagePayload);
            // Now update the UI based on your message payload!
          }
        }
    });
  }
}
