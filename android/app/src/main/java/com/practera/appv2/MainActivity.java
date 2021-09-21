package com.practera.appv2;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.firebase.messaging.RemoteMessage;
import com.practera.capacitor.custom.CustomNativePlugin;
import com.practera.capacitor.pusherbeams.PusherBeams;
import com.pusher.pushnotifications.PushNotificationReceivedListener;
import com.pusher.pushnotifications.PushNotifications;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      PushNotifications.start(getApplicationContext(), "c0ba349e-66c6-440d-8ac7-fe229709d088");
      PushNotifications.addDeviceInterest("general");

      add(PusherBeams.class);
      add(CustomNativePlugin.class);
    }});
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
