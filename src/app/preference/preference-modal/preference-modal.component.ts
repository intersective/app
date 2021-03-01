import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreferenceService, Category } from '@services/preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedModule } from '@shared/shared.module';
@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements  OnInit {
  
  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }
  ngOnInit() {
    
  }
  close () {
    this.modalController.dismiss();
  }
  
  back() {
  }
}
