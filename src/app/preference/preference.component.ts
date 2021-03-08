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
  routeUrl = 'app/preference';

  @ViewChild('preferenceList') preferenceList ; 
  @ViewChild('preferenceDetail') preferenceDetail ; 
  preferenceKey :string;
  
  constructor(
    public utils: UtilsService,
    public router: Router
  ) {
    super(router);
   }
   onEnter() {
    
    this.preferenceKey = null;
    
    // trigger onEnter after the element get generated
    setTimeout(() => {
      this.preferenceList.onEnter();
    });
  } 
  goto(event) {
    this.preferenceKey = event.preferenceKey;
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
