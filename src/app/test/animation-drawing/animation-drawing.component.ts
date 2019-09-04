import { Component } from '@angular/core';

@Component({
  templateUrl: './animation-drawing.component.html',
})

export class AnimationDrawingComponent {
  path: string;

  constructor() {
    this.path = 'M150 0 L75 200 L225 200 Z';
  }
}
