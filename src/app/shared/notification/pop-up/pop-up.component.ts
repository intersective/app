import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up',
  templateUrl: 'pop-up.component.html',
  styleUrls: ['pop-up.component.css']
})
export class PopUpComponent {
  type = '';
  redirect = ['/'];
  data = {};

  constructor(
    private router: Router,
    public modalController: ModalController
  ) {}

  async confirmed(): Promise<boolean> {
    await this.modalController.dismiss();
    // if this.redirect == false, don't redirect to another page
    if (this.redirect) {
      return this.router.navigate(this.redirect);
    }

    return;
  }
}
