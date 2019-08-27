import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'shared-animated-tick',
  templateUrl: './animated-tick.component.html',
  styleUrls: ['./animated-tick.component.scss']
})

export class AnimatedTickComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('created tick');
  }

  ngOnDestroy() {
    console.log('destroyed tick');
  }
}
