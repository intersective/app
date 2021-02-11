import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreferenceService } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '@services/utils.service';
import { ThrowStmt } from '@angular/compiler';
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

  constructor(
    private preferenceService: PreferenceService,
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  
  
  ngOnInit() {
    this.preferenceSubject$ = this.activatedRoute.data.subscribe(() => {
      this.preferenceService.getPreference();
    });
  }
  close () {
    this.modalController.dismiss();
  }
  PreferenceUpdateModal(event, key) {
    this.showUpdateModal = true;
    this.key = key;
    console.log('key',key)
  }
  ngOnDestroy() {
    if (this.preferenceSubject$ instanceof Subscription) {
      this.preferenceSubject$.unsubscribe();
    }
  }
}
