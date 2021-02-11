import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationService } from '@shared/notification/notification.service';


@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements OnInit {

  constructor(
    public modalController: ModalController,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
  }
  close () {
    this.modalController.dismiss();
  }
  PreferenceUpdateModal() {
    this.notificationService.PreferenceUpdateModal();
  }
}
