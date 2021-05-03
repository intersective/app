
import { Component, AfterContentChecked } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Achievement } from '@app/achievements/achievements.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-achievement-pop-up',
  templateUrl: 'achievement-pop-up.component.html',
  styleUrls: ['achievement-pop-up.component.scss']
})

export class AchievementPopUpComponent implements AfterContentChecked {

  type = '';
  achievement: Achievement;

  constructor(
    public modalController: ModalController,
    public utils: UtilsService
  ) {}

  ngAfterContentChecked() {
    document.getElementById('achievement-image').focus();
  }
  confirmed(event) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    this.modalController.dismiss();
  }
}
