import { Component, Input } from '@angular/core';
import { NotificationService } from '@shared/notification/notification.service';
import { UtilsService } from '@services/utils.service';
import { ModalController } from '@ionic/angular';
import { PushNotificationService } from '@services/push-notification.service';


@Component({
  selector: 'pn-permission-modal',
  templateUrl: './pn-permission-modal.component.html',
  styleUrls: ['./pn-permission-modal.component.scss']
})
export class PNPermissionModalComponent {
  message;
  icon;

  constructor(
    public modalController: ModalController,
    public utils: UtilsService,
    private pushNotificationService: PushNotificationService,
    private notificationService: NotificationService,
  ) {}

  dismissPermissionModal() {
    
    this.modalController.dismiss();
  }

  // go to Native App settings, so user can manually allow Push Notification there
  async goToSystemSetting() {
     const goToSetting = await this.utils.goToSystemSetting();
    const stateChange =  this.pushNotificationService.listenToStateChangeToActive();
    const permissionGranted = this.pushNotificationService.hasPermission();
    if (stateChange && permissionGranted ) {
      this.notificationService.dismiss();
    }
    return goToSetting;
  }
}
