import { Component, OnInit } from '@angular/core';
import { SharedModule } from  '@shared/shared.module';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-preference-update-container',
  templateUrl: './preference-update-container.component.html',
  styleUrls: ['./preference-update-container.component.scss']
})
export class PreferenceUpdateContainerComponent implements OnInit {

  constructor(
    private utils: UtilsService
  ) { }

  ngOnInit() {
  }

}
