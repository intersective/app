import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { PreferenceService, Category } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup } from '@angular/forms';

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

  form = new FormGroup({});

  preferenceSubject$: Subscription;
  currentPreference;
  private key: string;
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
    const key = activatedRoute.snapshot.params.key;
    this.preferenceSubject$ = preferenceService.preference$.subscribe(res => {
      this.preferences = res;
      if (this.preferences && key) {
       this.currentPreference = this.filterPreferences(this.preferences, key);

       if (this.currentPreference) {
         let controllers = {};
         this.currentPreference.options.forEach(option => {
           controllers[option.medium] = new FormControl({ value: option.value });
         })
         this.form = new FormGroup(controllers);
       }
      }
    });
  }

  ngOnInit() {
    this.currentPreference = {
      name: '',
      description: '',
      options: '',
      remarks: '',
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

  updatePreference(event) {
    if (!this.newUpdates) {
      this.newUpdates = {};
    }

    if (!this.newUpdates[this.currentPreference.key]) {
      this.newUpdates[this.currentPreference.key] = {
        [event.id]: event.checked
      };
    } else {
      this.newUpdates[this.currentPreference.key][event.id] = event.checked;
    }
  }

  /**
   * @description if `this.newUpdates` is detected has value, an API request sent
   *              to server
   * @return void
   */
  private async pushPreferenceUpdate(): Promise<void> {
    if (!this.utils.isEmpty(this.newUpdates)) {
      await this.preferenceService.update(this.newUpdates).toPromise();
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
