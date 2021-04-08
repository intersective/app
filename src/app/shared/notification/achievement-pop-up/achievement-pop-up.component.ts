import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Achievement } from '@app/achievements/achievements.service';
import { UtilsService } from '@services/utils.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-achievement-pop-up',
  templateUrl: 'achievement-pop-up.component.html',
  styleUrls: ['achievement-pop-up.component.scss']
})
export class AchievementPopUpComponent implements OnInit{
  type = '';
  achievement: Achievement;

  constructor(
    public modalController: ModalController,
    public utils: UtilsService
  ) {}
  ngOnInit() {
    document.getElementById('achievement-name').focus();
  }
  confirmed() {
    this.modalController.dismiss();
  }
}
