import { Component } from '@angular/core';
import * as Phaser from 'phaser';
// import { Phaser } from '@ion-phaser/core';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
})

export class PhaserComponent {
  game;
  public initialize: boolean;

  constructor() {
    console.log(Phaser);
    /*this.game = {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {}
    }
    this.initialize = true;*/
  }


}
