import { Component } from '@angular/core';
// import { Phaser } from '@ion-phaser/core';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
})

export class PhaserComponent {
  game;
  public initialize: boolean;

  constructor() {
    // console.log(Game);
    this.game = {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {}
    }
    this.initialize = true;
  }


}
