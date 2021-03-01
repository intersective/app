import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { PreferenceService } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '@services/utils.service';
import { ThrowStmt } from '@angular/compiler';
import { utils } from 'protractor';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit, OnDestroy {
  @Output() checkTheView = new EventEmitter<string>();

  preferences$ = this.preferenceService.preference$;
  preferenceSubject$: Subscription;
  prefAPI: any;

  constructor(
    private preferenceService: PreferenceService,
    public utils: UtilsService,
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

  goToPreferenceUpdate(event, key: string) {
    if (this.utils.isMobile()) {
      return this.router.navigate(['preferences', key]);
    }
    this.checkTheView.emit();
     
  }
  
}
