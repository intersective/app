import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { PreferenceService } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '@services/utils.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit, OnDestroy {
  // @Input() preferences$; 
  preferences$ = this.preferenceService.preference$;
  preferenceSubject$: Subscription;
  prefAPI: any;

  constructor(
    private preferenceService: PreferenceService,
    private util: UtilsService,
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

  goTo(direction) {
    return this.router.navigate(direction);
  }
}
