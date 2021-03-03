import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { PreferenceService } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnDestroy, OnInit {
  preferences$ = this.preferenceService.preference$;
  preferenceSubject$: Subscription;
  prefAPI: any;
  @Output() navigate = new EventEmitter();
  constructor(
    private preferenceService: PreferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
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

  goTo(direction) {
    return this.router.navigate(direction);
  }
}
