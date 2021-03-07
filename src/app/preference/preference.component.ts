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
  routeUrls = ['app/preference', 'preferences-detail'];

  @ViewChild('preferenceList') preferenceList ; 
  @ViewChild('preferenceDetail') preferenceDetail ; 
  preferenceKey ='';
  
  constructor(
    public utils: UtilsService,
    public router: Router
  ) {
    super(router);
   }

  goto(event) {
    if (event.categories)
    
        this.preferenceKey = event.categories.key;
        setTimeout(() => {
          this.preferenceDetail.onEnter();
        });
  }


  currentPreference() {
    if (this.preferenceKey) {
      return {
        preferenceKey: this.preferenceKey,
      };
    }
    return null;
  }
}
