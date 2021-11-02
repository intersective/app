import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PushNotificationService } from '@app/services/push-notification.service';
import { SharedService } from '@app/services/shared.service';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@services/utils.service';
import { FastFeedbackService } from '../fast-feedback/fast-feedback.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  isMobile: boolean;
  programName: string;
  initiator$ = this.route.params;

  constructor(
    private storage: BrowserStorageService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private fastFeedbackService: FastFeedbackService,
    readonly sharedService: SharedService,
    readonly pushNotificationService: PushNotificationService,
  ) {
    this.isMobile = this.utils.isMobile();
  }

  ngOnInit() {
    this.pushNotificationService.initiatePushNotification().then(() => {
      this.pushNotificationService.getSubscribedInterests().then(subscription => {
        console.log('Push notification subscriptions::', subscription);
      });
    });
    this.initiator$.subscribe(async () => {
      await this.sharedService.getTeamInfo().toPromise(); // update team info
      this.programName = this.storage.getUser().programName;
      this.fastFeedbackService.pullFastFeedback().subscribe();
    });
  }
}
