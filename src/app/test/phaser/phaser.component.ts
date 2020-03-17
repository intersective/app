import { Component, OnInit } from '@angular/core';
// import { Phaser } from 'Phaser';
declare var Phaser;
// import { load } from 'Phaser';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
})

export class PhaserComponent {
  game;//: Phaser.Game;

  public initialize: boolean;

  constructor() {
    // super('test');
    console.log(Phaser);
    this.game = new Phaser.Game(
      800,
      600,
      Phaser.AUTO,
      'phaser-game',
      {
        preload: this.preload,
        create: this.create
      },
      {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
      }
    );
    /*this.game = new Phaser.Game({
      parent: '#phaser-game',
      // domContainer: 'phaser-game',
      // gameTitle: 'Practera Game',
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      // physics: {
      //     default: 'arcade',
      //     arcade: {
      //         gravity: { y: 200 }
      //     }
      // },
      scene: {
        preload: this.preload,
        create: this.create
      },
    });*/
    /*this.game = {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
      scene: {}
    }
    this.initialize = true;*/
  }

  ngOnInit() {
    console.log(this);
    console.log(this.game);
  }

  preload() {
    // console.log(this.load.image('gem', 'assets/logo.svg'));
    this.game.load.image('background', 'assets/geometric-light.png');
    this.game.load.image('logo', 'assets/logo.svg');
    this.game.load.image('tail', 'assets/img/sample-badge.png');

    // this.load.setBaseURL('http://labs.phaser.io');

    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
  }

  /*preload() {
    this.game.load.image('lazur', 'assets/pics/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
  }*/
  create() {
     this.game.add.image(0, 0, 'background');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.game.add.titleSprite

    let emitter = this.game.add.emitter(this.game.world.centerX, this.game.world.centerY, 400);

    emitter.makeParticles( [ 'tail' ] );

    emitter.gravity = 200;
    emitter.setAlpha(1, 0, 3000);
    emitter.setScale(0.8, 0, 0.8, 0, 3000);

    emitter.start(false, 3000, 5);

    // let sprite = this.game.add.sprite(0, 300, 'logo', 0);
    /*this.anims.create({ key: 'diamond',
      frames: this.game.anims.generateFrameNames('gems',
      { prefix: 'diamond_',
        end: 15,
        zeroPad: 4
      }),
      repeat: 4
    });*/
    // var text = this.game.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00'
    // var gem = this.add.sprite(400, 300, 'gems').setScale(4);
    // gem.play('diamond');
    this.game.add.image(200, 200, 'logo');

    // this.add.image(400, 300, 'sky');

    let particles = this.game.particles.add('red');

    /*let emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });*/

    let logo = this.game.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
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


  /*animationStarted(sprite, animation) {
    this.add.text(32, 32, 'Animation started', { fill: 'white' });
  }

  animationLooped(sprite, animation) {
    if (animation.loopCount === 1) {
      this.loopText = this.add.text(32, 64, 'Animation looped', { fill: 'white' });
    }
    else
    {
      this.loopText.text = 'Animation looped x2';
      animation.loop = false;
    }

  }

  animationStopped(sprite, animation) {
    this.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });
  }

  update() {
    if (this.anim.isPlaying) {
      this.back.x -= 1;
    }
  }*/
}
