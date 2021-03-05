import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { RouterEnter } from '@services/router-enter.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent extends RouterEnter {
  @ViewChild('preferenceList') preferenceList ; 
  @ViewChild('preferenceDetail') preferenceDetail ; 

  routeUrl = 'app/preferences';
  
  currentPreference = {
    name: '',
    description: '',
    options: '',
    remarks: '',
  };
  constructor(
    public utils: UtilsService,
    public router: Router
  ) {
    super(router);
   }

  
  goTo(preference) {
    this.currentPreference = preference;
  }
}
