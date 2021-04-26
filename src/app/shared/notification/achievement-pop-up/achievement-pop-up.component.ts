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
  lastFocusedElement: HTMLElement|undefined;


  constructor(
    public modalController: ModalController,
    public utils: UtilsService
  ) {}

  confirmed() {
    this.modalController.dismiss();
    console.log('this.lastFocusedElementId', this.lastFocusedElement);
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }
  ngAfterContentChecked() {
    if (document.getElementById('achievement-name')) {
      document.getElementById('achievement-name').focus();
    }
  }
  confirmByEnter(event: KeyboardEvent) {
    if ((['Enter', 'Space']).indexOf(event.code) !== -1) {
      this.confirmed();
    }
  }
}
