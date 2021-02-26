import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { PreferenceService } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-preference-mobile',
  templateUrl: './preference-mobile.component.html',
  styleUrls: ['./preference-mobile.component.scss']
})
export class PreferenceMobileComponent implements  OnInit {

constructor(
  private preferenceService: PreferenceService,
  private activatedRoute: ActivatedRoute,
  private router: Router
) {}

ngOnInit() {
}

goTo(direction) {
  return this.router.navigate(direction);
}
}
