import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PreferenceService, Category } from '@services/preference.service';


@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements  OnInit {
  @ViewChild('updateModalTemplate') templateRef: TemplateRef<any>;
  preferences$ = this.preferenceService.preference$;
  preferenceSubject$: Subscription;
  
  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private preferenceService: PreferenceService,
    
  ) {}
  updateModalTemplate = false;
  ngOnInit() {
    this.preferenceSubject$ = this.preferenceService.getPreference();
  }
  close () {
    this.modalController.dismiss();
  }
  back() {}

  showUpdateModal(event) {
    this.updateModalTemplate = true;
  }
}
