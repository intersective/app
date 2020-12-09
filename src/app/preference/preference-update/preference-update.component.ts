import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private newUpdates; // required when toggle has modified

  constructor(
    private preferenceService: PreferenceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    preferenceService.getPreference();
    const key = activatedRoute.snapshot.params.key;
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

  updatePreference() {
    console.log('key::', this.key);
    // this.form.add
    console.log(this.form);
    console.log(this.currentPreference);
  }

  /**
   * @name back
   * @description manual back button to go back to a pre-structured routing (back to "/preference")
   */
  back() {
    this.router.navigate(['/preferences']);
  }
}
