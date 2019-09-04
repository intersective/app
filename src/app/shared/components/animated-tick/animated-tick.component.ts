import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'shared-animated-tick',
  templateUrl: './animated-tick.component.html',
  styleUrls: ['./animated-tick.component.scss']
})

export class AnimatedTickComponent implements OnInit, OnDestroy, OnChanges {
  @Input() stage: number;

  constructor() {}

  ngOnInit() {
    console.log('created tick');
  }

  ngOnChanges() {
    console.log('onChanges::', arguments);
  }

  ngOnDestroy() {
    console.log('destroyed tick');
  }
}
