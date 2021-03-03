import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-preferences-container',
  templateUrl: './preferences-container.component.html',
  styleUrls: ['./preferences-container.component.scss']
})
export class PreferencesContainerComponent implements OnInit {
  @ViewChild('preferenceList') preferenceList ; 

  @ViewChild('preferenceDetail') preferenceDetail ; 
  currentPreference = {
    name: '',
    description: '',
    options: '',
    remarks: '',
  };
  constructor(
    public utils: UtilsService
  ) { }

  ngOnInit() {
  }
  goTo(preference) {
    this.currentPreference = preference;
  }
}
