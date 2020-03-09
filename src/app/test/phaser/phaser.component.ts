import { Component } from '@angular/core';
import { Game } from 'phaser';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
})

export class PhaserComponent {
  constructor() {
    console.log(Game);
  }
}
