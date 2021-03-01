import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preference-modal',
  templateUrl: './preference-modal.component.html',
  styleUrls: ['./preference-modal.component.scss']
})
export class PreferenceModalComponent implements  OnInit {
  @ViewChild('updateModalTemplate') templateRef: TemplateRef<any>;
  
  constructor(
    public modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    
  ) {}
  updateModalTemplate = false;
  ngOnInit() {
  }
  close () {
    this.modalController.dismiss();
  }
  back() {}

  showUpdateModal(event) {
    console.log('I am triggered');
    this.updateModalTemplate = true;
  }
}
