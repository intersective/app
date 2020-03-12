import { Component, OnInit } from '@angular/core';
declare var Phaser;

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
})

export class PhaserComponent implements OnInit {
  game;
  back;
  mummy;
  anim;
  loopText;

  public initialize: boolean;

  constructor() {
    console.log(Phaser);
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 }
          }
      },
      scene: {
          preload: this.preload,
          create: this.create
      }
    });
    /*this.game = {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {}
    }
    this.initialize = true;*/
  }

  ngOnInit() {
    // this.game.add.image(0, 0, 'practera');
  }

  preload() {
    this.game.anims.load('practera', 'assets/icon/favicon.ico');
    // this.game.load.image('gem', 'assets/logo.svg');
  }
  /*preload() {
    this.game.load.image('lazur', 'assets/pics/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
  }*/
  create() {
    this.game.anims.create({ key: 'diamond', frames: this.game.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: 4 });
    // var text = this.game.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00'
    var gem = this.game.add.sprite(400, 300, 'gems').setScale(4);
     gem.play('diamond');
  }
  /*create() {
    this.back = this.game.add.image(0, -400, 'lazur');
    this.back.scale.set(2);
    this.back.smoothed = false;

    this.mummy = this.game.add.sprite(200, 360, 'mummy', 5);
    this.mummy.scale.set(4);
    this.mummy.smoothed = false;
    this.anim = this.mummy.animations.add('walk');

    this.anim.onStart.add(this.animationStarted, this);
    this.anim.onLoop.add(this.animationLooped, this);
    this.anim.onComplete.add(this.animationStopped, this);

    this.anim.play(10, true);
  }*/


  animationStarted(sprite, animation) {
    this.game.add.text(32, 32, 'Animation started', { fill: 'white' });
  }

  animationLooped(sprite, animation) {
    if (animation.loopCount === 1) {
      this.loopText = this.game.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else
    {
      this.loopText.text = 'Animation looped x2';
      animation.loop = false;
    }

  }

  animationStopped(sprite, animation) {
    this.game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });
  }

  update() {
    if (this.anim.isPlaying) {
      this.back.x -= 1;
    }
  }
}
