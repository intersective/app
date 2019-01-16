import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FastFeedbackService } from './fast-feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';

@Component({
  selector: 'app-fast-feedback',
  templateUrl: './fast-feedback.component.html',
  styleUrls: ['./fast-feedback.component.scss']
})
export class FastFeedbackComponent implements OnInit {
  fastFeedbackForm: FormGroup;
  questions = [];
  meta = [];
  loading: boolean = false;

  constructor(
    public modalController: ModalController,
    private fastFeedbackService: FastFeedbackService,
    private utils: UtilsService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    let group: any = {};
    this.questions.forEach(question => {
      group[question.id] = new FormControl('', Validators.required);
    });
    this.fastFeedbackForm = new FormGroup(group);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  submit() {
    this.loading = true;
    const formData = this.fastFeedbackForm.value;
    const data = [];

    this.utils.each(formData, (answer, questionId) => {
      data.push({
        id: questionId,
        choice_id: answer,
      });
    });
    // prepare parameters
    let params = {
      context_id: this.meta['context_id']
    };
    // if team_id exist, pass team_id
    if (this.meta['team_id']) {
      params.team_id = this.meta['team_id'];
    } else if (this.meta['target_user_id']) {
      // otherwise, pass target_user_id
      params.target_user_id = this.meta['target_user_id'];
    }

    this.fastFeedbackService.submit(data, params).subscribe(res => {
      this.notification.alert({
        header: 'Submission Successful',
        message: 'Thanks for taking time to answer the feedback question.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.loading = false;
            return this.dismiss();
          },
        }],
      });
    });
  }
}
