import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preference-update-modal',
  templateUrl: './preference-update-modal.component.html',
  styleUrls: ['./preference-update-modal.component.scss']
})
export class PreferenceUpdateModalComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { 
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
