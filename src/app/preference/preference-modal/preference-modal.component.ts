import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreferenceService, Category } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PreferenceUpdateComponent } from '@shared/components/preference-update/preference-update.component';
import { SharedModule } from '@shared/shared.module';
@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements OnDestroy, OnInit {
  preferences$ = this.preferenceService.preference$;
  preferenceSubject$: Subscription;
  currentPreference;
  showUpdateModal = false;
  private key: string;
  preferences: {
    categories: any;
  };

  constructor(
    private preferenceService: PreferenceService,
    public modalController: ModalController,
    public preferenceUpdate: PreferenceUpdateComponent,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.preferenceSubject$ = this.preferenceService.getPreference();
    this.currentPreference = {
      name: '',
      description: '',
      options: '',
      remarks: '',
      key: ''
    };
  }
  close () {
    this.modalController.dismiss();
  }
  preferenceUpdateModal(event, key) {
    this.showUpdateModal = true;
    this.key = key;
    this.preferenceService.getPreference();
    this.preferenceSubject$ = this.preferenceService.preference$.subscribe(res => {
      this.preferences = res;
      if (this.preferences && this.key) {
       this.currentPreference = this.filterPreferences(this.preferences, this.key);
      }
    });
  }
  ngOnDestroy() {
    if (this.preferenceSubject$ instanceof Subscription) {
      this.preferenceSubject$.unsubscribe();
    }
  }
  /**
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
  back() {
    this.showUpdateModal = false;
  }
}
