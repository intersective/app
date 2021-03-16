import { Component, OnDestroy, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { PreferenceService } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { PreferenceUpdateComponent } from '../preference-update/preference-update.component';

@Component({
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.scss']
})
export class PreferenceListComponent implements OnDestroy {

  preferences$ = this.preferenceService.preference$;

  preferenceSubject$: Subscription;

  prefAPI: any;
  @Output() navigate = new EventEmitter();
  @Input() currentPreference;
  // @Output() preferenceReady = new EventEmitter();

  constructor(
    private preferenceService: PreferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    private notificationService: NotificationService,
    private ngZone: NgZone,
  ) {}


  ngOnDestroy() {
    if (this.preferenceSubject$ instanceof Subscription) {
      this.preferenceSubject$.unsubscribe();
    }
  }

  goTo(direction) {
    if ( this.utils.isMobile ) {
    }
    return this.router.navigate(direction);
  }


  onEnter() {
    this.preferenceSubject$ = this.activatedRoute.data.subscribe(() => {
      this.preferenceService.getPreference();
    });
  }
  async goToPreference(pref) {
    if (this.utils.isMobile()) {
      // redirect to update page for mobile
      return this.ngZone.run(() => {
        return this.router.navigate(['preference-update', pref.key]);
      });
    } else {
      this.navigate.emit(pref);
    }
  }
}
