import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notifications-preference',
  templateUrl: './notifications-preference.component.html',
  styleUrls: ['./notifications-preference.component.scss']
})
export class NotificationsPreferenceComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }
  goTo(direction) {
    return this.router.navigate(direction);
  }
}
