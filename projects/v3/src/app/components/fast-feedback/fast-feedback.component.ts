import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FastFeedbackService } from '@v3/services/fast-feedback.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from '@v3/services/utils.service';
import { Meta } from '@v3/services/notifications.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: "app-fast-feedback",
  templateUrl: "./fast-feedback.component.html",
  styleUrls: ["./fast-feedback.component.scss"],
})
export class FastFeedbackComponent implements OnInit {
  fastFeedbackForm: FormGroup;
  questions = [];
  meta: Meta;
  loading = false;
  submissionCompleted: boolean;
  isMobile: boolean;

  constructor(
    private modalController: ModalController,
    private utils: UtilsService,
    private fastFeedbackService: FastFeedbackService,
    private storage: BrowserStorageService,
  ) {
    this.isMobile = this.utils.isMobile();
  }

  ngOnInit() {
    const group: any = {};
    this.questions.forEach((question) => {
      group[question.id] = new FormControl("", Validators.required);
    });
    this.fastFeedbackForm = new FormGroup(group);
    this.submissionCompleted = false;
  }

  dismiss(data) {
    // change the flag to false
    this.storage.set("fastFeedbackOpening", false);
    this.modalController.dismiss(data);
  }

  async submit(): Promise<any> {
    this.loading = true;
    const formData = this.fastFeedbackForm.value;
    const answers = [];

    this.utils.each(formData, (answer, questionId) => {
      answers.push({
        id: questionId,
        choice_id: answer,
      });
    });

    // prepare parameters
    const params: {
      context_id?: number;
      team_id?: number;
      target_user_id?: number;
    } = {
      context_id: this.meta?.context_id,
      team_id: null,
      target_user_id: null,
    };

    // if team_id exist, pass team_id
    if (this.meta?.team_id) {
      params.team_id = this.meta?.team_id;
    } else if (this.meta?.target_user_id) {
      // otherwise, pass target_user_id
      params.target_user_id = this.meta?.target_user_id;
    }

    let submissionResult;
    try {
      submissionResult = await firstValueFrom(this.fastFeedbackService
        .submit(answers, params));

      this.submissionCompleted = true;
      return setTimeout(() => {
        return this.dismiss(submissionResult);
      }, 2000);
    } catch (err) {
      console.error(err); // output error in devtool

      // set to true to fail gracefully
      this.submissionCompleted = true;
      this.dismiss(submissionResult);
    }
  }

  get isRedColor(): boolean {
    return this.utils.isColor("red", this.storage.getUser().colors?.primary);
  }
}
