import { Component, AfterContentChecked } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Achievement } from '@app/achievements/achievements.service';
import { UtilsService } from '@services/utils.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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
    if (document.getElementById('achievement-name')) {
      document.getElementById('achievement-name').focus();
    }
  }

  confirmed() {
    this.modalController.dismiss();
  }
  confirmByEnter(event: KeyboardEvent) {
    if ((['Enter', 'Space']).indexOf(event.code) !== -1) {
      this.confirmed();
    }
  }
}
