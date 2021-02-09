import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements OnInit {

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }
  close () {
    this.modalController.dismiss();
  }
}
