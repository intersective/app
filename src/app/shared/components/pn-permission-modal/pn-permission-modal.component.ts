import { Component, Input } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { ModalController } from '@ionic/angular';

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
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  // go to Native App settings, so user can manually allow Push Notification there
  async goToSystemSetting() {
    const goToSetting = await this.utils.goToSystemSetting();
    return goToSetting;
  }
}
