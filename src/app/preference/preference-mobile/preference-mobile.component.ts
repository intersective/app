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
export class PreferenceMobileComponent implements OnDestroy, OnInit {
preferences$ = this.preferenceService.preference$;
preferenceSubject$: Subscription;
prefAPI: any;

constructor(
  private preferenceService: PreferenceService,
  private activatedRoute: ActivatedRoute,
  private router: Router
) {}

ngOnInit() {
  this.preferenceSubject$ = this.activatedRoute.data.subscribe(() => {
    this.preferenceService.getPreference();
  });
}

ngOnDestroy() {
  if (this.preferenceSubject$ instanceof Subscription) {
    this.preferenceSubject$.unsubscribe();
  }
}
}
