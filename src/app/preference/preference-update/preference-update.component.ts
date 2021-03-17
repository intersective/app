import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output,
  NgZone,
} from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { PreferenceService, Category } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterEnter } from '@services/router-enter.service';
import { Subscription } from 'rxjs/Subscription';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preference-update',
  templateUrl: './preference-update.component.html',
  styleUrls: ['./preference-update.component.scss'],
})
export class PreferenceUpdateComponent extends RouterEnter {
  @Input() inputId: string;
  @Output() navigate = new EventEmitter();

  routeUrl = '/preference-update/';
  noHistoryStack = true;
  preferences: {
    categories: any;
  };

  preferenceSubject$: Subscription;
  currentPreference = {
    name: '',
    description: '',
    options: [],
    remarks: '',
    key: '',
  };
  private key: string;
  private newUpdates: {
    [propName: string]: {
      [propName: string]: boolean;
    };
  }; // required when toggle has modified

  constructor(
    private preferenceService: PreferenceService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private utils: UtilsService,
    private modalController: ModalController,
    private ngZone: NgZone
  ) {
    super(router);
  }

  onEnter() {
    this.currentPreference = {
      name: '',
      description: '',
      options: [],
      remarks: '',
      key: '',
    };
    if (this.inputId) {
      this.key = this.inputId;
    }
    this.preferenceService.getPreference();
    const key = this.getKey();
    this.preferenceSubject$ = this.preferenceService.preference$.subscribe(
      (res) => {
        this.preferences = res;
        if (this.preferences && key) {
          this.currentPreference = this.filterPreferences(
            this.preferences,
            key
          );

        }
      }
    );
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
      preferences.categories.find((cat) => {
        result = cat.preferences.find((pref) => {
          return pref.key === key;
        });
        return result;
      });
    }

    return result;
  }
  /**
   * @name getKey
   * @description finding the preferenceKey based on the view workflow
   *
   */
  private getKey() {
    if (this.utils.isMobile()) {
      return this.activatedRoute.snapshot.params.key;
    } else {
      return this.inputId;
    }
  }

  /**
   * @name updatePreference
   * @description prepare new data changes for PUT request to preference API (with @func back())
   * @param {string, checked } changes medium in string, event is ionic ion-toggle event object
   */
  updatePreference(changes: { medium: string; checked: boolean }) {
    const { medium, checked } = changes;
    if (!this.newUpdates) {
      this.newUpdates = {};
    }

    if (!this.newUpdates[this.currentPreference.key]) {
      this.newUpdates[this.currentPreference.key] = {
        [medium]: checked,
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
        await this.preferenceService.update(this.newUpdates).toPromise();
      }
    } catch (err) {
      console.log(err);
    }
    return;
  }
  /* @name back
  * @description manual back button to go back to a pre-structured routing
  *              (back to "/preference")
  */
  back() {
    this.pushPreferenceUpdate().then(() => {
      return this.ngZone.run(() => {
        return this.router.navigate(['app/preference']);
      });
    });
  }
}
