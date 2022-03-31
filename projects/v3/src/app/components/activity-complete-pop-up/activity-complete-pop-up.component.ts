import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilsService } from '@v3/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-complete-pop-up',
  templateUrl: 'activity-complete-pop-up.component.html',
  styleUrls: ['activity-complete-pop-up.component.scss']
})
export class ActivityCompletePopUpComponent {
  activityId: number;
  activityCompleted: boolean;

  constructor(
    public modalController: ModalController,
    public utils: UtilsService,
    private router: Router,
  ) {}

  confirmed(continueToActivity: boolean) {
    this.modalController.dismiss();
    if (!continueToActivity) {
      const route = this.utils.isMobile() ? ['v3', 'activity-mobile', this.activityId] : ['v3', 'activity-desktop', this.activityId]
      this.router.navigate(route);
    } else {
      if (this.activityCompleted) {
        this.router.navigate(['v3', 'home'], { queryParams: { activityId: this.activityId, activityCompleted: this.activityCompleted } });
      } else {
        this.router.navigate(['v3', 'home'], { queryParams: { activityId: this.activityId } });
      }
    }
  }
}
