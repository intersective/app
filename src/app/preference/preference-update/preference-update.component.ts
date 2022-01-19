import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { PreferenceService, Category } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { IonToggle } from '@ionic/angular';

interface Preference {
  name: string;
  description: string;
  options?: {
    'locked': boolean;
    'locked_name': string;
    'medium': string;
    'name': string;
    'value': boolean;
  }[];
  remarks: string;
  key: string;
}

@Component({
  selector: 'app-preference-update',
  templateUrl: './preference-update.component.html',
  styleUrls: ['./preference-update.component.scss']
})
export class PreferenceUpdateComponent implements OnInit, OnDestroy {
  noHistoryStack = true;
  preferences: {
    categories: any;
  };

  preferenceSubject$: Subscription;
  currentPreference: Preference;
  private newUpdates: {
    [propName: string]: {
      [propName: string]: boolean;
    };
  }; // required when toggle has modified

  constructor(
    private preferenceService: PreferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
  ) {
    preferenceService.getPreference();
    const key = this.activatedRoute.snapshot.params.key;
    this.preferenceSubject$ = preferenceService.preference$.subscribe(res => {
      this.preferences = res;
      if (this.preferences && key) {
       this.currentPreference = this.filterPreferences(this.preferences, key);
      }
    });
  }

  ngOnInit() {
    this.currentPreference = {
      name: '',
      description: '',
      options: [],
      remarks: '',
      key: '',
    };
  }

  ngOnDestroy() {
    if (this.preferenceSubject$ && this.preferenceSubject$ instanceof Subscription) {
      this.preferenceSubject$.unsubscribe();
    }
  }

  /**
   * show medium choices for current preference key
   *
   * @name filterPreferences
   * @param {Category[] }} preferences   entire preferences object
   * @param {string}        key  url parameter
   */
  filterPreferences(preferences: { categories?: Category[] }, key: string) {
    let result;
    if (preferences && preferences.categories) {
      preferences.categories.find(cat => {
        result = cat.preferences.find(pref => {
          return pref.key === key;
        });
        return result;
      });
    }

    return result;
  }

  /**
   * @name updatePreference
   * @description prepare new data changes for PUT request to preference API (with @func back())
   * @param {string, checked } changes medium in string, event is ionic ion-toggle event object
   */
  updatePreference(changes: { medium: string; event: { checked: boolean }; }) {
    const { medium, event } = changes;
    const checked = event.checked;

    if (!this.newUpdates) {
      this.newUpdates = {};
    }

    if (!this.newUpdates[this.currentPreference.key]) {
      this.newUpdates[this.currentPreference.key] = {
        [medium]: checked
      };
    } else {
      this.newUpdates[this.currentPreference.key][medium] = checked;
    }
  }

  /**
   * @description if `this.newUpdates` is detected has value, an API request sent
   *              to server
   * @return void
   */
  private async pushPreferenceUpdate(): Promise<void> {
    try {
      if (!this.utils.isEmpty(this.newUpdates)) {
        // data format: https://github.com/intersective/preferences-api/tree/develop/docs
        const data = { app: this.newUpdates };
        await this.preferenceService.update(data).toPromise();
      }
    } catch (err) {
      console.log(err);
    }
    return;
  }

  /**
   * @name back
   * @description manual back button to go back to a pre-structured routing
   *              (back to "/preference")
   */
  back() {
    this.pushPreferenceUpdate().then(() => {
      this.router.navigate(['/preferences']);
    });
  }
}
