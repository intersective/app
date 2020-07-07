(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~assessment-assessment-module~events-events-module~reviews-reviews-module~tasks-tasks-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/assessment/assessment.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/assessment/assessment.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header mode=\"ios\">\n  <ion-toolbar class=\"ion-toolbar-absolute\">\n    <ion-buttons slot=\"start\" *ngIf=\"utils.isMobile()\">\n      <ion-button (click)=\"back()\" id=\"btn-back\">\n        <ion-icon class=\"icon-backward ion-margin-start\" name=\"arrow-back\" color=\"primary\" slot=\"icon-only\" ></ion-icon>\n      </ion-button>\n    </ion-buttons>\n\n    <ion-title class=\"ion-text-center\" [ngClass]=\"{\n      'subtitle-2': !utils.isMobile()\n    }\">Assessment</ion-title>\n    <ng-container *ngIf=\"doAssessment || doReview\">\n      <div class=\"ion-text-center sub-title caption gray-2 saving-msg\">{{savingMessage}}</div>\n      <ion-button [disabled]=\"savingButtonDisabled || submitted\" (click)=\"submit(true, false, true)\" class=\"text-button subtitle-1\" color=\"primary\" slot=\"end\" fill=\"clear\" size=\"small\">Save</ion-button>\n    </ng-container>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding ion-text-center\" color=\"light\" [ngClass]=\"{\n  'ion-content-absolute-with-footer': hasFooter(),\n  'ion-content-absolute': !hasFooter()\n}\" appFloat>\n  <h1 class=\"headline-4\">{{ assessment.name }}</h1>\n  <ion-text class=\"ion-text-left\">\n    <app-description *ngIf=\"assessment.description\" [content]=\"assessment.description\" id=\"asmt-des\" class=\"body-1 black\"></app-description>\n  </ion-text>\n  <p class=\"due-date assessment subtitle-1 gray-2 ion-text-center\" [ngClass]=\"{'over': assessment.isOverdue}\" *ngIf=\"doAssessment\">\n    {{ this.sharedService.dueDateFormatter(assessment.dueDate) }}\n  </p>\n  <div *ngIf=\"!doAssessment && submission.submitterName && !submission.isLocked\" class=\"review-submitter ion-text-left\">\n    <p class=\"subtitle-1\">\n      Submitted by {{ submission.submitterName }}\n    </p>\n  </div>\n  <div *ngIf=\"submission.reviewerName\" class=\"review-submitter ion-text-left\">\n    <p class=\"subtitle-1 gray-3\">\n      Reviewed by {{ submission.reviewerName }} {{review.status}}\n    </p>\n  </div>\n\n  <ion-list *ngIf=\"submission.isLocked\" class=\"member-detail-container no-bg\" lines=\"none\">\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <img [src]=\"submission.submitterImage ? submission.submitterImage : 'https://my.practera.com/img/user-512.png'\">\n      </ion-avatar>\n      <ion-label>\n        <p class=\"subtitle-1\">Locked by {{ submission.submitterName }}</p>\n        <p class=\"caption gray-2\">Please wait until the user finishes editing</p>\n      </ion-label>\n    </ion-item>\n  </ion-list>\n\n  <form [formGroup]=\"questionsForm\">\n    <ng-container *ngIf=\"loadingAssessment\">\n      <ion-spinner></ion-spinner>\n    </ng-container>\n    <ng-container *ngFor=\"let group of assessment.groups\">\n      <h3 class=\"headline-6\">{{ group.name }}</h3>\n      <ion-text color=\"dark\" class=\"ion-text-left\">\n        <app-description class=\"g-description\" *ngIf=\"group.description\" [content]=\"group.description\"></app-description>\n      </ion-text>\n      <ng-container *ngFor=\"let question of group.questions\">\n        <ion-card class=\"practera-card question-card ion-text-left\">\n          <ion-card-header class=\"q-title body-2 black\">\n            {{ question.name }}\n            <ion-text class=\"required-indicator\" color=\"danger\" *ngIf=\"question.isRequired\">*</ion-text>\n            <ion-icon *ngIf=\"question.info\" color=\"primary\" class=\"icon-info vertical-middle\" (click)=\"showQuestionInfo(question.info)\" name=\"information-circle-outline\"></ion-icon>\n            <ion-text color=\"dark\" class=\"paragraph ion-text-left\">\n              <app-description class=\"q-description\" *ngIf=\"question.description\" [content]=\"question.description\"></app-description>\n            </ion-text>\n          </ion-card-header>\n          <div class=\"ion-text-center ion-margin-bottom\" *ngIf=\"loadingSubmission; else submissionTpl\">\n            <ion-spinner></ion-spinner>\n          </div>\n          <ng-template #submissionTpl>\n            <ion-card-content [ngSwitch]=\"question.type\" class=\"q-content ion-margin-top ion-padding-horizontal\" color=\"light\">\n              <p><i *ngIf=\"!doAssessment &&\n                (\n                  (!question.reviewerOnly && !submission.answers[question.id]) ||\n                  (!doReview && question.reviewerOnly && !review.answers[question.id])\n                )\"\n                >No Answer Submitted</i></p>\n\n              <app-text\n                *ngSwitchCase=\"'text'\"\n                [question]=\"question\"\n                [doAssessment]=\"doAssessment\"\n                [doReview]=\"doReview\"\n                [submission]=\"(submission.answers && submission.answers[question.id]) ? submission.answers[question.id] : {}\"\n                [review]=\"(review.answers && review.answers[question.id]) ? review.answers[question.id] : {}\"\n                [reviewStatus]=\"review.status\"\n                [submissionStatus]= \"submission.status\"\n                [formControlName]=\"'q-' + question.id\"\n                [control]=\"questionsForm.controls['q-' + question.id]\"\n                (saveProgress)=\"submit(true)\"\n              ></app-text>\n\n              <app-oneof\n                *ngSwitchCase=\"'oneof'\"\n                [question]=\"question\"\n                [doAssessment]=\"doAssessment\"\n                [doReview]=\"doReview\"\n                [submission]=\"(submission.answers && submission.answers[question.id]) ? submission.answers[question.id] : {}\"\n                [review]=\"(review.answers && review.answers[question.id]) ? review.answers[question.id] : {}\"\n                [reviewStatus]=\"review.status\"\n                [submissionStatus]= \"submission.status\"\n                [formControlName]=\"'q-' + question.id\"\n                [control]=\"questionsForm.controls['q-' + question.id]\"\n                (saveProgress)=\"submit(true)\"\n              ></app-oneof>\n\n              <app-multiple\n                *ngSwitchCase=\"'multiple'\"\n                [question]=\"question\"\n                [doAssessment]=\"doAssessment\"\n                [doReview]=\"doReview\"\n                [submission]=\"(submission.answers && submission.answers[question.id]) ? submission.answers[question.id] : {}\"\n                [review]=\"(review.answers && review.answers[question.id]) ? review.answers[question.id] : {}\"\n                [reviewStatus]=\"review.status\"\n                [submissionStatus]= \"submission.status\"\n                [formControlName]=\"'q-' + question.id\"\n                [control]=\"questionsForm.controls['q-' + question.id]\"\n                (saveProgress)=\"submit(true)\"\n              ></app-multiple>\n\n              <app-file\n                *ngSwitchCase=\"'file'\"\n                [question]=\"question\"\n                [doAssessment]=\"doAssessment\"\n                [doReview]=\"doReview\"\n                [submission]=\"(submission.answers && submission.answers[question.id]) ? submission.answers[question.id] : {}\"\n                [review]=\"(review.answers && review.answers[question.id]) ? review.answers[question.id] : {}\"\n                [reviewStatus]=\"review.status\"\n                [submissionStatus]= \"submission.status\"\n                [formControlName]=\"'q-' + question.id\"\n                [control]=\"questionsForm.controls['q-' + question.id]\"\n                (saveProgress)=\"submit(true)\"\n              ></app-file>\n\n              <app-team-member-selector\n                *ngSwitchCase=\"'team member selector'\"\n                [question]=\"question\"\n                [doAssessment]=\"doAssessment\"\n                [doReview]=\"doReview\"\n                [submission]=\"(submission.answers && submission.answers[question.id]) ? submission.answers[question.id] : {}\"\n                [review]=\"(review.answers && review.answers[question.id]) ? review.answers[question.id] : {}\"\n                [reviewStatus]=\"review.status\"\n                [submissionStatus]= \"submission.status\"\n                [formControlName]=\"'q-' + question.id\"\n                [control]=\"questionsForm.controls['q-' + question.id]\"\n                (saveProgress)=\"submit(true)\"\n              ></app-team-member-selector>\n\n            </ion-card-content>\n          </ng-template>\n        </ion-card>\n      </ng-container>\n    </ng-container>\n\n  </form>\n</ion-content>\n\n<ion-footer\n  color=\"light\"\n  class=\"ion-footer-absolute\"\n  *ngIf=\"hasFooter()\">\n  <ion-toolbar class=\"ion-text-center\" style=\"height: 100%\">\n    <ion-spinner\n      *ngIf=\"loadingSubmission || loadingFeedbackReviewed\"\n      name=\"dots\"\n      class=\"vertical-middle ion-text-center\"\n      style=\"width: 100%\"\n    ></ion-spinner>\n    <ng-container *ngIf=\"!loadingSubmission && !loadingFeedbackReviewed\">\n      <ion-button\n        *ngIf=\"(doAssessment || doReview) && !submitting && !submitted\"\n        id=\"btn-submit\"\n        [disabled]=\"questionsForm.invalid\"\n        (click)=\"submit(false)\"\n        shape=\"round\"\n        fill=\"clear\"\n        class=\"footer-action\"\n        >SUBMIT</ion-button>\n\n      <ng-container *ngIf=\"footerText()\">\n        <span class=\"footer-text ion-float-left\">{{ footerText() }}</span>\n        <img *ngIf=\"continueBtnLoading || submitting; else continueTmp\" class=\"footer-action ion-float-right\" src=\"/assets/loading.gif\">\n        <ng-template #continueTmp>\n          <ion-button\n            (click)=\"clickBtnContinue()\"\n            shape=\"round\"\n            fill=\"clear\"\n            class=\"ion-float-right footer-action\">CONTINUE</ion-button>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file-display/file-display.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file-display/file-display.component.html ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"file\">\n  <ng-container [ngSwitch]=\"fileType\">\n\n    <ng-container *ngSwitchCase=\"'image'\">\n      <app-img [imgSrc]=\"file.url\"></app-img>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'video'\">\n      <video controls #video preload>\n        <ng-container *ngIf=\"file.transcoded\">\n          <source [src]=\"file.transcoded + '.mp4#t=0.5'\" type=\"video/mp4\">\n          <source [src]=\"file.transcoded + '.webm'\" type=\"video/webm\">\n          <source [src]=\"file.transcoded + '.ts'\">\n        </ng-container>\n        <source [src]=\"file.url\">\n        {{ file.url }}\n      </video>\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"'any'\">\n      <div *ngIf=\"!(virusDetection && virusDetection.infected); else virusDetected\">\n        <a [href]=\"file.url\" target=\"_blank\" class=\"subtitle-1\">\n          <ion-icon name=\"document\"></ion-icon>&nbsp;{{ file.filename }}\n        </a>\n        <ion-icon *ngIf=\"file.url.length > 0\" name=\"search\" (click)=\"previewFile(file)\" color=\"primary\" class=\"ion-padding-left ion-float-right\"></ion-icon>\n      </div>\n      <ng-template #virusDetected>\n        <ion-item lines=\"none\" color=\"transparent\">\n          <ion-icon name=\"alert\" color=\"danger\" slot=\"start\"></ion-icon>\n          <ion-label class=\"warning\">\n            The file uploaded had a virus and has been quarantined\n          </ion-label>\n        </ion-item>\n      </ng-template>\n    </ng-container>\n\n  </ng-container>\n</ng-container>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"submissionStatus !== 'in progress' && submission.answer\">\n  <app-file-display\n    [file]=\"submission.answer\"\n    [fileType]=\"question.fileType\"\n  ></app-file-display>\n</ng-container>\n\n<div *ngIf=\"reviewStatus !== 'in progress' && (review.answer || review.comment)\" class=\"q-reviews\">\n  <ion-label class=\"q-title subtitle-2 black\">Feedback</ion-label>\n  <ng-container *ngIf=\"review.answer\">\n    <app-file-display\n      [file]=\"review.answer\"\n      [fileType]=\"question.fileType\"\n    ></app-file-display>\n  </ng-container>\n  <ng-container *ngIf=\"review.comment\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.comment }}</p>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"doAssessment\">\n  <file-stack\n    [accept]=\"fileTypes\"\n    [fileType]=\"question.fileType\"\n    (complete)=\"onFileUploadCompleted($event)\"\n    [disabled]=\"control.disabled\"\n  >\n  </file-stack>\n  <ion-text *ngFor=\"let error of errors\" color=\"danger\">\n    <p>{{error}}</p>\n  </ion-text>\n  <app-file-display\n    [file]=\"uploadedFile ? uploadedFile : submission.answer\"\n    [fileType]=\"question.fileType\"\n  ></app-file-display>\n</ng-container>\n\n<ng-container *ngIf=\"doReview\">\n  <ng-container *ngIf=\"question.canAnswer\">\n    <file-stack\n      [accept]=\"fileTypes\"\n      [fileType]=\"question.fileType\"\n      (complete)=\"onFileUploadCompleted($event, 'answer')\"\n      [disabled]=\"control.disabled\"\n    >\n    </file-stack>\n    <app-file-display\n      [file]=\"uploadedFile ? uploadedFile : review.answer\"\n      [fileType]=\"question.fileType\"\n    ></app-file-display>\n  </ng-container>\n  <ion-textarea\n    *ngIf=\"question.canComment && submission.answer\"\n    class=\"background-white ion-margin-top\"\n    #commentEle\n    rows=\"4\"\n    [(ngModel)]=\"comment\"\n    (ngModelChange)=\"onChange(comment, 'comment')\"\n    placeholder=\"Please put your feedback here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n</ng-container>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/multiple/multiple.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/multiple/multiple.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"submissionStatus !== 'in progress' && submission.answer\">\n  <ion-list class=\"no-bg\">\n    <ion-item *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n      <ion-label class=\"white-space-normal subtitle-1 black\">{{ choice.name }}</ion-label>\n      <ion-checkbox [checked]=\"submission.answer.includes(choice.id)\" disabled mode=\"md\"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <div *ngIf=\"submission.explanation && submission.explanation.changingThisBreaksApplicationSecurity\" class=\"q-reviews\">\n    <ion-label class=\"q-title black\">Explanation</ion-label>\n    <p class=\"paragraph\" [innerHtml]=\"submission.explanation\"></p>\n  </div>\n</ng-container>\n\n<div *ngIf=\"reviewStatus !== 'in progress' && (review.answer || review.comment)\" class=\"q-reviews\">\n  <ion-label class=\"q-title subtitle-2 black\">Feedback</ion-label>\n  <ng-container *ngIf=\"review.answer\">\n    <ion-list class=\"no-bg\">\n      <ng-container *ngFor=\"let choice of question.choices; let i = index\">\n        <ng-container *ngIf=\"review.answer.includes(choice.id)\">\n          <ion-item [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n            <ion-label class=\"white-space-normal subtitle-1 gray-2\">{{ choice.name }}</ion-label>\n            <ion-checkbox checked disabled mode=\"md\"></ion-checkbox>\n          </ion-item>\n        </ng-container>\n      </ng-container>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"review.comment\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.comment }}</p>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"doAssessment\">\n  <ion-list class=\"no-bg\">\n    <ion-item class=\"choice-item\" *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n      <ion-label class=\"white-space-normal subtitle-1\">{{ choice.name }}</ion-label>\n      <ion-checkbox\n        [checked]=\"submission.answer ? submission.answer.includes(choice.id) : false\"\n        [value]=\"choice.id\"\n        mode=\"md\"\n        (ionChange)=\"onChange(choice.id)\"\n        [disabled]=\"control.disabled\"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-text *ngFor=\"let error of errors\" color=\"danger\">\n    <p>{{error}}</p>\n  </ion-text>\n</ng-container>\n\n<ng-container *ngIf=\"doReview\">\n  <ion-list class=\"no-bg\" *ngIf=\"question.canAnswer\">\n    <ion-list-header>\n      <ion-label class=\"body-2\">Your Answer is</ion-label>\n    </ion-list-header>\n    <ion-item class=\"choice-item\" *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n      <ion-label class=\"white-space-normal subtitle-1\">{{ choice.name }}</ion-label>\n      <ion-checkbox\n        [checked]=\"review.answer ? review.answer.includes(choice.id) : false\"\n        [value]=\"choice.id\"\n        mode=\"md\"\n        (ionChange)=\"onChange(choice.id, 'answer')\"\n        [disabled]=\"control.disabled\"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <ion-textarea\n    *ngIf=\"question.canComment && submission.answer\"\n    class=\"background-white\"\n    #commentEle\n    margin-top\n    rows=\"4\"\n    [(ngModel)]=\"comment\"\n    (ngModelChange)=\"onChange(comment, 'comment')\"\n    placeholder=\"Please put your feedback here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n</ng-container>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/oneof/oneof.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/oneof/oneof.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"submissionStatus !== 'in progress' && submission.answer\">\n  <ion-list class=\"no-bg\">\n    <ion-radio-group [value]=\"submission.answer\">\n      <ion-item *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1\">{{ choice.name }}</ion-label>\n        <ion-radio [value]=\"choice.id\" disabled mode=\"md\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n  <div *ngIf=\"submission.explanation && submission.explanation.changingThisBreaksApplicationSecurity\" class=\"q-reviews\">\n    <ion-label class=\"q-title black\">Explanation</ion-label>\n    <p class=\"paragraph\" [innerHtml]=\"submission.explanation\"></p>\n  </div>\n</ng-container>\n\n<div *ngIf=\"reviewStatus !== 'in progress' && (review.answer || review.comment)\" class=\"q-reviews\">\n  <ion-label class=\"q-title subtitle-2 black\">Feedback</ion-label>\n  <ng-container *ngIf=\"review.answer\">\n    <ion-list class=\"no-bg\">\n      <ion-radio-group [value]=\"review.answer\">\n        <ng-container *ngFor=\"let choice of question.choices; let i = index\">\n          <ng-container *ngIf=\"choice.id === review.answer\">\n            <ion-item [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n              <ion-label class=\"white-space-normal subtitle-1 gray-2\">{{ choice.name }}</ion-label>\n              <ion-radio [value]=\"choice.id\" disabled mode=\"md\"></ion-radio>\n            </ion-item>\n          </ng-container>\n        </ng-container>\n      </ion-radio-group>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"review.comment\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.comment }}</p>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"doAssessment\">\n  <ion-list class=\"no-bg\">\n    <ion-radio-group [value]=\"submission.answer\" #answerEle (ionChange)=\"onChange(answerEle.value)\">\n      <ion-item class=\"choice-item\" *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1\">{{ choice.name }}</ion-label>\n        <ion-radio [value]=\"choice.id\" mode=\"md\" [disabled]=\"control.disabled\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n</ng-container>\n\n<ng-container *ngIf=\"doReview\">\n  <ion-list class=\"no-bg\" *ngIf=\"question.canAnswer\">\n    <ion-radio-group #answerEle [value]=\"review.answer\" (ionChange)=\"onChange(answerEle.value, 'answer')\">\n      <ion-list-header>\n        <ion-label class=\"body-2 black\">Your Answer is</ion-label>\n      </ion-list-header>\n      <ion-item class=\"choice-item\" *ngFor=\"let choice of question.choices; let i = index\" [lines]=\"i == question.choices.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1\">{{ choice.name }}</ion-label>\n        <ion-radio [value]=\"choice.id\" mode=\"md\" [disabled]=\"control.disabled\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n  <ion-textarea\n    *ngIf=\"question.canComment && submission.answer\"\n    class=\"background-white ion-margin-top\"\n    #commentEle\n    [(ngModel)]=\"comment\"\n    rows=\"4\"\n    (ngModelChange)=\"onChange(comment, 'comment')\"\n    placeholder=\"Please put your feedback here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n</ng-container>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/team-member-selector/team-member-selector.component.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/team-member-selector/team-member-selector.component.html ***!
  \**************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"submissionStatus !== 'in progress' && submission.answer\">\n  <ion-list class=\"no-bg\">\n    <ion-radio-group [value]=\"submission.answer\">\n      <ion-item *ngFor=\"let teamMember of question.teamMembers;let i = index\" [lines]=\"i == question.teamMembers.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1 black\">{{ teamMember.userName }}</ion-label>\n        <ion-radio [value]=\"teamMember.key\" disabled mode=\"md\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n</ng-container>\n\n<div *ngIf=\"reviewStatus !== 'in progress' && (review.answer || review.comment)\" class=\"q-reviews\">\n  <ion-label class=\"q-title subtitle-2 black\">Feedback</ion-label>\n  <ng-container *ngIf=\"review.answer\">\n    <ion-list class=\"no-bg\">\n      <ion-radio-group [value]=\"review.answer\">\n        <ng-container *ngFor=\"let teamMember of question.teamMembers;let i = index\">\n          <ng-container *ngIf=\"teamMember.key === review.answer\">\n            <ion-item [lines]=\"i == question.teamMembers.length - 1 ? 'none' : ''\">\n              <ion-label class=\"white-space-normal subtitle-1 gray-2\">{{ teamMember.userName }}</ion-label>\n              <ion-radio [value]=\"teamMember.key\" disabled mode=\"md\"></ion-radio>\n            </ion-item>\n          </ng-container>\n        </ng-container>\n      </ion-radio-group>\n    </ion-list>\n  </ng-container>\n  <ng-container *ngIf=\"review.comment\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.comment }}</p>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"doAssessment\">\n  <ion-list class=\"no-bg\">\n    <ion-radio-group [value]=\"submission.answer\" #answerEle (ionChange)=\"onChange(answerEle.value)\">\n      <ion-item class=\"choice-item\" *ngFor=\"let teamMember of question.teamMembers;let i = index\" [lines]=\"i == question.teamMembers.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1\">{{ teamMember.userName }}</ion-label>\n        <ion-radio [value]=\"teamMember.key\" mode=\"md\" [disabled]=\"control.disabled\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n</ng-container>\n\n<ng-container *ngIf=\"doReview\">\n  <ion-list class=\"no-bg\" *ngIf=\"question.canAnswer\">\n    <ion-radio-group #answerEle [value]=\"review.answer\" (ionChange)=\"onChange(answerEle.value, 'answer')\">\n      <ion-list-header>\n        <ion-label class=\"body-2\">Your Answer is</ion-label>\n      </ion-list-header>\n      <ion-item class=\"choice-item\" *ngFor=\"let teamMember of question.teamMembers;let i = index\" [lines]=\"i == question.teamMembers.length - 1 ? 'none' : ''\">\n        <ion-label class=\"white-space-normal subtitle-1\">{{ teamMember.userName }}</ion-label>\n        <ion-radio [value]=\"teamMember.key\" mode=\"md\" [disabled]=\"control.disabled\"></ion-radio>\n      </ion-item>\n    </ion-radio-group>\n  </ion-list>\n  <ion-textarea\n    *ngIf=\"question.canComment\"\n    class=\"background-white ion-margin-top\"\n    #commentEle\n    rows=\"4\"\n    [(ngModel)]=\"comment\"\n    (ngModelChange)=\"onChange(comment, 'comment')\"\n    placeholder=\"Please put your feedback here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n</ng-container>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/text/text.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/questions/text/text.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-container *ngIf=\"submissionStatus !== 'in progress' && submission.answer\">\n  <p class=\"paragraph body-1 black\">{{ submission.answer }}</p>\n</ng-container>\n\n<div *ngIf=\"reviewStatus !== 'in progress' && (review.answer || review.comment)\" class=\"q-reviews\">\n  <ion-label class=\"q-title subtitle-2 black\">Feedback</ion-label>\n  <ng-container *ngIf=\"review.answer\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.answer }}</p>\n  </ng-container>\n  <ng-container *ngIf=\"review.comment\">\n    <p class=\"paragraph body-2 gray-2\">{{ review.comment }}</p>\n  </ng-container>\n</div>\n\n<ng-container *ngIf=\"doAssessment\">\n  <ion-textarea\n    class=\"background-white ion-margin-top textarea\"\n    [(ngModel)]=\"answer\"\n    #answerEle\n    rows=\"4\"\n    (ionFocus)=\"onFocus()\"\n    (ionChange)=\"onChange()\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n  <ion-text *ngFor=\"let error of errors\" color=\"danger\">\n    <p>{{error}}</p>\n  </ion-text>\n</ng-container>\n\n<ng-container *ngIf=\"doReview\">\n  <ion-textarea\n    *ngIf=\"question.canAnswer\"\n    class=\"background-white ion-margin-top\"\n    rows=\"4\"\n    [(ngModel)]=\"answer\"\n    #answerEle\n    (ionFocus)=\"onFocus()\"\n    (ionChange)=\"onChange('answer')\"\n    placeholder=\"Please put your answer here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n  <ion-textarea\n    *ngIf=\"question.canComment && submission.answer\"\n    class=\"background-white ion-margin-top\"\n    [(ngModel)]=\"comment\"\n    #commentEle\n    rows=\"4\"\n    (ionFocus)=\"onFocus()\"\n    (ionChange)=\"onChange('comment')\"\n    placeholder=\"Please put your feedback here\"\n    [disabled]=\"control.disabled\"></ion-textarea>\n</ng-container>\n\n");

/***/ }),

/***/ "./src/app/assessment/assessment-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/assessment/assessment-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: AssessmentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentRoutingModule", function() { return AssessmentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _assessment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assessment.component */ "./src/app/assessment/assessment.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var routes = [
    {
        path: 'assessment/:activityId/:contextId/:id',
        component: _assessment_component__WEBPACK_IMPORTED_MODULE_2__["AssessmentComponent"],
        data: {
            action: 'assessment'
        }
    },
    {
        path: 'review/:contextId/:id/:submissionId',
        component: _assessment_component__WEBPACK_IMPORTED_MODULE_2__["AssessmentComponent"],
        data: {
            action: 'review'
        }
    },
    {
        path: 'event/:contextId/:id',
        component: _assessment_component__WEBPACK_IMPORTED_MODULE_2__["AssessmentComponent"],
        data: {
            action: 'assessment',
            from: 'events'
        }
    }
];
var AssessmentRoutingModule = /** @class */ (function () {
    function AssessmentRoutingModule() {
    }
    AssessmentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AssessmentRoutingModule);
    return AssessmentRoutingModule;
}());



/***/ }),

/***/ "./src/app/assessment/assessment.component.scss":
/*!******************************************************!*\
  !*** ./src/app/assessment/assessment.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".text-right {\n  text-align: right;\n}\n\n.icon-info {\n  font-size: 20px;\n}\n\n.icon-backward {\n  font-size: 20px !important;\n}\n\n.review-submitter p {\n  margin-top: 16px;\n  margin-bottom: 16px;\n}\n\n.sub-title.title-ios {\n  margin-top: 30px;\n  height: 16px;\n}\n\n.text-button {\n  text-transform: capitalize;\n}\n\nion-header ion-toolbar {\n  min-height: 56px;\n}\n\nion-header ion-toolbar .saving-msg {\n  margin-top: 30px;\n  margin-left: 60px;\n}\n\n.member-detail-container {\n  margin-bottom: 0px;\n  margin-top: 15px;\n}\n\n.member-detail-container ion-item {\n  height: 64px;\n  --background: transparent;\n  --padding-start: 0px;\n}\n\n.member-detail-container ion-avatar {\n  height: 48px;\n  width: 48px;\n}\n\n.member-detail-container ion-label h4 {\n  font-size: 16px;\n}\n\n.member-detail-container ion-label p {\n  font-size: 12px;\n  color: var(--ion-color-medium-shade);\n}\n\nion-footer .footer-text {\n  margin: 20px;\n  text-transform: capitalize;\n}\n\nion-footer .footer-action {\n  height: 40px;\n  margin: 10px 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9hc3Nlc3NtZW50L2Fzc2Vzc21lbnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Fzc2Vzc21lbnQvYXNzZXNzbWVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxlQUFBO0FDRUY7O0FEQUE7RUFDRSwwQkFBQTtBQ0dGOztBRENFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtBQ0VKOztBREdFO0VBQ0UsZ0JBQUE7RUFDQSxZQUFBO0FDQUo7O0FER0E7RUFDRSwwQkFBQTtBQ0FGOztBREdBO0VBQ0UsZ0JBQUE7QUNBRjs7QURDRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURHQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUNBRjs7QURDRTtFQUNFLFlBQUE7RUFDQSx5QkFBQTtFQUNBLG9CQUFBO0FDQ0o7O0FEQ0U7RUFDRSxZQUFBO0VBQ0EsV0FBQTtBQ0NKOztBREVJO0VBQ0UsZUFBQTtBQ0FOOztBREVJO0VBQ0UsZUFBQTtFQUNBLG9DQUFBO0FDQU47O0FES0U7RUFDRSxZQUFBO0VBQ0EsMEJBQUE7QUNGSjs7QURJRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtBQ0ZKIiwiZmlsZSI6InNyYy9hcHAvYXNzZXNzbWVudC9hc3Nlc3NtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRleHQtcmlnaHQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cbi5pY29uLWluZm8ge1xuICBmb250LXNpemU6IDIwcHg7XG59XG4uaWNvbi1iYWNrd2FyZCB7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ucmV2aWV3LXN1Ym1pdHRlciB7XG4gIHAge1xuICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgfVxufVxuXG4uc3ViLXRpdGxlIHtcbiAgJi50aXRsZS1pb3Mge1xuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gICAgaGVpZ2h0OiAxNnB4O1xuICB9XG59XG4udGV4dC1idXR0b24ge1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cblxuaW9uLWhlYWRlciBpb24tdG9vbGJhciB7XG4gIG1pbi1oZWlnaHQ6IDU2cHg7XG4gIC5zYXZpbmctbXNnIHtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiA2MHB4O1xuICB9XG59XG5cbi5tZW1iZXItZGV0YWlsLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDBweDtcbiAgbWFyZ2luLXRvcDogMTVweDtcbiAgaW9uLWl0ZW0ge1xuICAgIGhlaWdodDogNjRweDtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tcGFkZGluZy1zdGFydDogMHB4O1xuICB9XG4gIGlvbi1hdmF0YXIge1xuICAgIGhlaWdodDogNDhweDtcbiAgICB3aWR0aDogNDhweDtcbiAgfVxuICBpb24tbGFiZWwge1xuICAgIGg0IHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB9XG4gICAgcCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XG4gICAgfVxuICB9XG59XG5pb24tZm9vdGVyIHtcbiAgLmZvb3Rlci10ZXh0IHtcbiAgICBtYXJnaW46IDIwcHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIH1cbiAgLmZvb3Rlci1hY3Rpb24ge1xuICAgIGhlaWdodDogNDBweDtcbiAgICBtYXJnaW46IDEwcHggMjBweDtcbiAgfVxufVxuXG4iLCIudGV4dC1yaWdodCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4uaWNvbi1pbmZvIHtcbiAgZm9udC1zaXplOiAyMHB4O1xufVxuXG4uaWNvbi1iYWNrd2FyZCB7XG4gIGZvbnQtc2l6ZTogMjBweCAhaW1wb3J0YW50O1xufVxuXG4ucmV2aWV3LXN1Ym1pdHRlciBwIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLnN1Yi10aXRsZS50aXRsZS1pb3Mge1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBoZWlnaHQ6IDE2cHg7XG59XG5cbi50ZXh0LWJ1dHRvbiB7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG5pb24taGVhZGVyIGlvbi10b29sYmFyIHtcbiAgbWluLWhlaWdodDogNTZweDtcbn1cbmlvbi1oZWFkZXIgaW9uLXRvb2xiYXIgLnNhdmluZy1tc2cge1xuICBtYXJnaW4tdG9wOiAzMHB4O1xuICBtYXJnaW4tbGVmdDogNjBweDtcbn1cblxuLm1lbWJlci1kZXRhaWwtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICBtYXJnaW4tdG9wOiAxNXB4O1xufVxuLm1lbWJlci1kZXRhaWwtY29udGFpbmVyIGlvbi1pdGVtIHtcbiAgaGVpZ2h0OiA2NHB4O1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLXBhZGRpbmctc3RhcnQ6IDBweDtcbn1cbi5tZW1iZXItZGV0YWlsLWNvbnRhaW5lciBpb24tYXZhdGFyIHtcbiAgaGVpZ2h0OiA0OHB4O1xuICB3aWR0aDogNDhweDtcbn1cbi5tZW1iZXItZGV0YWlsLWNvbnRhaW5lciBpb24tbGFiZWwgaDQge1xuICBmb250LXNpemU6IDE2cHg7XG59XG4ubWVtYmVyLWRldGFpbC1jb250YWluZXIgaW9uLWxhYmVsIHAge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlKTtcbn1cblxuaW9uLWZvb3RlciAuZm9vdGVyLXRleHQge1xuICBtYXJnaW46IDIwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuaW9uLWZvb3RlciAuZm9vdGVyLWFjdGlvbiB7XG4gIGhlaWdodDogNDBweDtcbiAgbWFyZ2luOiAxMHB4IDIwcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/assessment/assessment.component.ts":
/*!****************************************************!*\
  !*** ./src/app/assessment/assessment.component.ts ***!
  \****************************************************/
/*! exports provided: AssessmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentComponent", function() { return AssessmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _assessment_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assessment.service */ "./src/app/assessment/assessment.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _services_router_enter_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @services/router-enter.service */ "./src/app/services/router-enter.service.ts");
/* harmony import */ var _services_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @services/shared.service */ "./src/app/services/shared.service.ts");
/* harmony import */ var _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../activity/activity.service */ "./src/app/activity/activity.service.ts");
/* harmony import */ var _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../fast-feedback/fast-feedback.service */ "./src/app/fast-feedback/fast-feedback.service.ts");
/* harmony import */ var _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @shared/new-relic/new-relic.service */ "./src/app/shared/new-relic/new-relic.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












var SAVE_PROGRESS_TIMEOUT = 10000;
var AssessmentComponent = /** @class */ (function (_super) {
    __extends(AssessmentComponent, _super);
    function AssessmentComponent(router, route, assessmentService, utils, notificationService, storage, sharedService, activityService, fastFeedbackService, ngZone, newRelic) {
        var _this = _super.call(this, router) || this;
        _this.router = router;
        _this.route = route;
        _this.assessmentService = assessmentService;
        _this.utils = utils;
        _this.notificationService = notificationService;
        _this.storage = storage;
        _this.sharedService = sharedService;
        _this.activityService = activityService;
        _this.fastFeedbackService = fastFeedbackService;
        _this.ngZone = ngZone;
        _this.newRelic = newRelic;
        _this.fromPage = '';
        _this.navigate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.changeStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        _this.routeUrl = '/assessment/';
        // the structure of assessment
        _this.assessment = {
            name: '',
            type: '',
            description: '',
            isForTeam: false,
            dueDate: '',
            isOverdue: false,
            groups: [],
            pulseCheck: false,
        };
        _this.submission = {
            id: 0,
            status: '',
            answers: {},
            submitterName: '',
            modified: '',
            isLocked: false,
            submitterImage: '',
            reviewerName: ''
        };
        _this.review = {
            id: 0,
            answers: {},
            status: '',
            modified: ''
        };
        // if doAssessment is true, it means this user is actually doing assessment, meaning it is not started or in progress
        // if action == 'assessment' and doAssessment is false, it means this user is reading the submission or feedback
        _this.doAssessment = false;
        // if doReview is true, it means this user is actually doing review, meaning this assessment is pending review
        // if action == 'review' and doReview is false, it means the review is done and this user is reading the submission and review
        _this.doReview = false;
        _this.feedbackReviewed = false;
        _this.loadingAssessment = true;
        _this.loadingSubmission = true;
        _this.questionsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({});
        _this.savingButtonDisabled = true;
        return _this;
    }
    // force every navigation happen under radar of angular
    AssessmentComponent.prototype._navigate = function (direction, params) {
        var _this = this;
        if (this.utils.isMobile()) {
            // redirect to topic/assessment page for mobile
            return this.ngZone.run(function () {
                return _this.router.navigate(direction, params);
            });
        }
        else {
            // emit to parent component(events component)
            if (['events', 'reviews'].includes(direction[1])) {
                this.navigate.emit();
                return;
            }
            // emit event to parent component(task component)
            switch (direction[0]) {
                case 'topic':
                    this.navigate.emit({
                        type: 'topic',
                        topicId: direction[2]
                    });
                    break;
                case 'assessment':
                    this.navigate.emit({
                        type: 'assessment',
                        contextId: direction[3],
                        assessmentId: direction[4]
                    });
                    break;
                default:
                    return this.ngZone.run(function () {
                        return _this.router.navigate(direction, params);
                    });
            }
        }
    };
    AssessmentComponent.prototype._initialise = function () {
        this.assessment = {
            name: '',
            type: '',
            description: '',
            isForTeam: false,
            dueDate: '',
            isOverdue: false,
            groups: [],
            pulseCheck: false,
        };
        this.submission = {
            id: 0,
            status: '',
            answers: {},
            submitterName: '',
            modified: '',
            isLocked: false,
            submitterImage: '',
            reviewerName: ''
        };
        this.review = {
            id: 0,
            answers: {},
            status: '',
            modified: ''
        };
        this.loadingAssessment = true;
        this.loadingSubmission = true;
        this.loadingFeedbackReviewed = false;
        this.saving = false;
        this.doAssessment = false;
        this.doReview = false;
        this.feedbackReviewed = false;
        this.questionsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({});
        this.submitting = false;
        this.submitted = false;
        this.savingButtonDisabled = true;
        this.savingMessage = '';
        this.continueBtnLoading = false;
    };
    AssessmentComponent.prototype.onEnter = function () {
        var _this = this;
        this._initialise();
        if (this.inputAction) {
            this.action = this.inputAction;
        }
        else {
            this.action = this.route.snapshot.data.action;
        }
        if (!this.fromPage) {
            this.fromPage = this.route.snapshot.paramMap.get('from');
        }
        if (!this.fromPage) {
            this.fromPage = this.route.snapshot.data.from;
        }
        if (this.inputId) {
            this.id = +this.inputId;
        }
        else {
            this.id = +this.route.snapshot.paramMap.get('id');
        }
        if (this.inputActivityId) {
            this.activityId = +this.inputActivityId;
        }
        else {
            this.activityId = +this.route.snapshot.paramMap.get('activityId');
        }
        if (this.inputContextId) {
            this.contextId = +this.inputContextId;
        }
        else {
            this.contextId = +this.route.snapshot.paramMap.get('contextId');
        }
        if (this.inputSubmissionId) {
            this.submissionId = +this.inputSubmissionId;
        }
        else {
            this.submissionId = +this.route.snapshot.paramMap.get('submissionId');
        }
        // get assessment structure and populate the question form
        this.assessmentService.getAssessment(this.id, this.action)
            .subscribe(function (assessment) {
            _this.assessment = assessment;
            _this.newRelic.setPageViewName("Assessment: " + _this.assessment.name + " ID: " + _this.id);
            _this.populateQuestionsForm();
            _this.loadingAssessment = false;
            _this._getSubmission();
            if (_this.doAssessment && _this.assessment.isForTeam && !_this.storage.getUser().teamId) {
                return _this.notificationService.alert({
                    message: 'To do this assessment, you have to be in a team.',
                    buttons: [
                        {
                            text: 'OK',
                            role: 'cancel',
                            handler: function () {
                                if (_this.activityId) {
                                    _this._navigate(['app', 'activity', _this.activityId]);
                                }
                                else {
                                    _this._navigate(['app', 'home']);
                                }
                            }
                        }
                    ]
                });
            }
        }, function (error) {
            _this.newRelic.noticeError(error);
        });
    };
    AssessmentComponent.prototype.ionViewWillLeave = function () {
        this.sharedService.stopPlayingVideos();
    };
    // get the submission answers &/| review answers
    AssessmentComponent.prototype._getSubmission = function () {
        var _this = this;
        this.getSubmission = this.assessmentService.getSubmission(this.id, this.contextId, this.action, this.submissionId).subscribe(function (result) {
            var submission = result.submission, review = result.review;
            _this.submission = submission;
            _this.review = review;
            _this.loadingSubmission = false;
            // If team assessment locked set readonly view.
            // set doAssessment, doReview to false - because when assessment lock we can't do both.
            // set submission status to done - because we need to show readonly answers in question components.
            if (_this.submission.isLocked) {
                _this.doAssessment = false;
                _this.doReview = false;
                _this.savingButtonDisabled = true;
                _this.submission.status = 'done';
                return;
            }
            // this component become a page for doing assessment if
            // - submission is empty or
            // - submission.status is 'in progress'
            if (_this.utils.isEmpty(_this.submission) || _this.submission.status === 'in progress') {
                _this.doAssessment = true;
                _this.doReview = false;
                if (_this.submission.status === 'in progress') {
                    _this.savingMessage = 'Last saved ' + _this.utils.timeFormatter(_this.submission.modified);
                    _this.savingButtonDisabled = false;
                }
                return;
            }
            if (review.status === 'in progress') {
                _this.savingMessage = 'Last saved ' + _this.utils.timeFormatter(review.modified);
                _this.savingButtonDisabled = false;
            }
            // this component become a page for doing review, if
            // - the submission status is 'pending review' and
            // - this.action is review
            //
            // @TECHDEBT: why can't we just treat the entire assessment as "review" when
            // `this.action` is equal to "review"?
            if (_this.submission.status === 'pending review' && _this.action === 'review') {
                _this.doReview = true;
            }
            // call todo item to check if the feedback has been reviewed or not
            if (_this.submission.status === 'published') {
                _this.loadingFeedbackReviewed = true;
                _this.assessmentService.getFeedbackReviewed(_this.submission.id)
                    .subscribe(function (feedbackReviewed) {
                    _this.feedbackReviewed = feedbackReviewed;
                    _this.loadingFeedbackReviewed = false;
                }, function (error) {
                    _this.newRelic.noticeError("" + JSON.stringify(error));
                });
            }
        }, function (error) {
            _this.newRelic.noticeError("" + JSON.stringify(error));
        });
    };
    /**
     * a consistent comparison logic to ensure mandatory status
     * @param {question} question
     */
    AssessmentComponent.prototype.isRequired = function (question) {
        var role = 'submitter';
        if (this.action === 'review') {
            role = 'reviewer';
        }
        return (question.isRequired && question.audience.includes(role));
    };
    // Populate the question form with FormControls.
    // The name of form control is like 'q-2' (2 is an example of question id)
    AssessmentComponent.prototype.populateQuestionsForm = function () {
        var _this = this;
        var validator = [];
        this.assessment.groups.forEach(function (group) {
            group.questions.forEach(function (question) {
                // check if the compulsory is mean for current user's role
                if (_this.isRequired(question)) {
                    // put 'required' validator in FormControl
                    validator = [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required];
                }
                else {
                    validator = [];
                }
                _this.questionsForm.addControl('q-' + question.id, new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', validator));
            });
        });
    };
    /**
     * Navigate back to the previous page
     */
    AssessmentComponent.prototype.navigateBack = function () {
        if (this.fromPage && this.fromPage === 'reviews') {
            return this._navigate(['app', 'reviews']);
        }
        if (this.fromPage && this.fromPage === 'events') {
            return this._navigate(['app', 'events']);
        }
        if (this.activityId) {
            return this._navigate(['app', 'activity', this.activityId]);
        }
        return this._navigate(['app', 'home']);
    };
    /**
     * When user click on the back button
     */
    AssessmentComponent.prototype.back = function () {
        var _this = this;
        this.newRelic.actionText('Back to previous page.');
        if (this.action === 'assessment'
            && this.submission.status === 'published'
            && !this.feedbackReviewed) {
            return this.notificationService.alert({
                header: "Mark feedback as read?",
                message: 'Would you like to mark the feedback as read?',
                buttons: [
                    {
                        text: 'No',
                        handler: function () { return _this.navigateBack(); },
                    },
                    {
                        text: 'Yes',
                        handler: function () { return _this.markReviewFeedbackAsRead().then(function () {
                            return _this.navigateBack();
                        }); }
                    }
                ]
            });
        }
        else {
            // force saving progress
            this.submit(true, true, true);
            return this.navigateBack();
        }
    };
    /**
     * @name compulsoryQuestionsAnswered
     * @description to check if every compulsory question has been answered
     * @param {Object[]} answers a list of answer object (in submission-based format)
     */
    AssessmentComponent.prototype.compulsoryQuestionsAnswered = function (answers) {
        var _this = this;
        var missing = [];
        var answered = {};
        this.utils.each(answers, function (answer) {
            answered[answer.assessment_question_id] = answer;
        });
        this.assessment.groups.forEach(function (group) {
            group.questions.forEach(function (question) {
                if (_this.isRequired(question)) {
                    if (_this.utils.isEmpty(answered[question.id]) || _this.utils.isEmpty(answered[question.id].answer)) {
                        missing.push(question);
                    }
                }
            });
        });
        return missing;
    };
    /**
     * When user click the continue button
     */
    AssessmentComponent.prototype.clickBtnContinue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.submission.status === 'published' && !this.feedbackReviewed)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.markReviewFeedbackAsRead()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.goToNextTask();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Go to the next task
     */
    AssessmentComponent.prototype.goToNextTask = function () {
        var _this = this;
        // skip "continue workflow" && instant redirect user, when:
        // - review action (this.action == 'review')
        // - fromPage = events (check AssessmentRoutingModule)
        if (this.action === 'review' ||
            (this.action === 'assessment' && this.fromPage === 'events')) {
            return this.navigateBack();
        }
        this.newRelic.actionText('Navigate to next task.');
        this.continueBtnLoading = true;
        this.activityService.gotoNextTask(this.activityId, 'assessment', this.id, this.submitted).then(function (redirect) {
            _this.continueBtnLoading = false;
            if (redirect) {
                _this._navigate(redirect);
            }
        });
    };
    /**
     * - check if fastfeedback is available
     * - show next sequence if submission successful
     */
    AssessmentComponent.prototype.pullFastFeedback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal, err_1, toasted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.continueBtnLoading = true;
                        // check if this assessment have plus check turn on, if it's on show plus check and toast message
                        if (!this.assessment.pulseCheck) {
                            this.continueBtnLoading = false;
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 8]);
                        return [4 /*yield*/, this.fastFeedbackService.pullFastFeedback({ modalOnly: true }).toPromise()];
                    case 2:
                        modal = _a.sent();
                        if (!(modal && modal.present)) return [3 /*break*/, 5];
                        return [4 /*yield*/, modal.present()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, modal.onDidDismiss()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.continueBtnLoading = false;
                        return [3 /*break*/, 8];
                    case 6:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.notificationService.alert({
                                header: 'Error retrieving pulse check data',
                                message: err_1.msg || JSON.stringify(err_1)
                            })];
                    case 7:
                        toasted = _a.sent();
                        this.continueBtnLoading = false;
                        throw new Error(err_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * handle submission and autosave
     * @param saveInProgress set true for autosaving or it treat the action as final submision
     * @param goBack use to unlock team assessment when leave assessment by clicking back button
     * @param isManualSave use to detect manual progress save
     */
    AssessmentComponent.prototype.submit = function (saveInProgress, goBack, isManualSave) {
        return __awaiter(this, void 0, void 0, function () {
            var answers, questionId, assessment, requiredQuestions;
            var _this = this;
            return __generator(this, function (_a) {
                /**
                 * checking if this is a submission or progress save
                 * - if it's a submission
                 *    - assign true to saving variable to disable duplicate saving
                 *    - change submitting variable value to true
                 * - if it's a progress save
                 *    - if this is a manual save or there is no other auto save in progress
                 *      - change saving variable value to true to disable duplicate saving
                 *      - make manual save button disable
                 *      - change savingMessage variable value to 'Saving...' to show save in progress
                 *    - if this is not manual save or there is one save in progress
                 *      - do nothing
                 */
                if (saveInProgress) {
                    if (isManualSave || !this.saving) {
                        this.savingMessage = 'Saving...';
                        this.savingButtonDisabled = true;
                    }
                    else {
                        return [2 /*return*/];
                    }
                }
                else {
                    this.submitting = true;
                }
                this.saving = true;
                answers = [];
                questionId = 0;
                assessment = {
                    id: this.id,
                    in_progress: false
                };
                // form submission answers
                if (this.doAssessment) {
                    assessment.context_id = this.contextId;
                    if (saveInProgress) {
                        assessment.in_progress = true;
                    }
                    if (this.assessment.isForTeam && goBack) {
                        assessment.unlock = true;
                    }
                    this.utils.each(this.questionsForm.value, function (value, key) {
                        questionId = +key.replace('q-', '');
                        var answer;
                        if (value) {
                            answer = value;
                        }
                        else {
                            _this.assessment.groups.forEach(function (group) {
                                var currentQuestion = group.questions.find(function (question) {
                                    return question.id === questionId;
                                });
                                if (currentQuestion && currentQuestion.type === 'multiple') {
                                    answer = [];
                                }
                                else {
                                    answer = null;
                                }
                            });
                        }
                        answers.push({
                            assessment_question_id: questionId,
                            answer: answer
                        });
                    });
                }
                // form feedback answers
                if (this.doReview) {
                    assessment = Object.assign(assessment, {
                        review_id: this.review.id,
                        submission_id: this.submission.id,
                        in_progress: (saveInProgress) ? true : false,
                    });
                    this.utils.each(this.questionsForm.value, function (answer, key) {
                        if (!_this.utils.isEmpty(answer)) {
                            answer.assessment_question_id = +key.replace('q-', '');
                            answers.push(answer);
                        }
                    });
                }
                requiredQuestions = this.compulsoryQuestionsAnswered(answers);
                if (!saveInProgress && requiredQuestions.length > 0) {
                    this.submitting = false;
                    // display a pop up if required question not answered
                    return [2 /*return*/, this.notificationService.popUp('shortMessage', {
                            message: 'Required question answer missing!'
                        })];
                }
                // save the submission/feedback
                this.assessmentService.saveAnswers(assessment, answers, this.action, this.submission.id).subscribe(function (result) {
                    if (saveInProgress) {
                        _this.newRelic.actionText('Saved progress.');
                        // display message for successfull saved answers
                        _this.savingMessage = 'Last saved ' + _this._getCurrentTime();
                        _this.savingButtonDisabled = false;
                    }
                    else {
                        _this.newRelic.actionText('Assessment Submitted.');
                        _this.submitting = false;
                        _this.submitted = true;
                        _this.changeStatus.emit({
                            id: +_this.id,
                            status: _this.assessment.type === 'moderated' ? 'pending review' : 'done'
                        });
                        // disabled all forms controls
                        Object.keys(_this.questionsForm.controls).forEach(function (key) { return _this.questionsForm.controls[key].disable(); });
                        return _this.pullFastFeedback();
                    }
                }, function (err) {
                    _this.newRelic.noticeError(JSON.stringify(err));
                    _this.submitting = false;
                    _this.savingButtonDisabled = false;
                    if (saveInProgress) {
                        // display message when saving answers failed
                        _this.savingMessage = 'Auto save unavailable';
                    }
                    else {
                        // display a pop up if submission failed
                        _this.notificationService.alert({
                            header: 'Submission failed',
                            message: err.msg || JSON.stringify(err),
                            buttons: [
                                {
                                    text: 'OK',
                                    role: 'cancel'
                                }
                            ]
                        });
                        throw new Error(err.msg || JSON.stringify(err));
                    }
                });
                // if saveInProgress and isManualSave true renabling save without wait 10 second
                if (saveInProgress && isManualSave) {
                    this.saving = false;
                }
                // if timeout, reset this.saving flag to false, to enable saving again
                setTimeout(function () { return _this.saving = false; }, SAVE_PROGRESS_TIMEOUT);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Mark review feedback as read
     */
    AssessmentComponent.prototype.markReviewFeedbackAsRead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2, toasted, err_3, msg, toasted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // do nothing if feedback is already mark as read
                        if (this.feedbackReviewed) {
                            return [2 /*return*/];
                        }
                        this.continueBtnLoading = true;
                        this.newRelic.actionText('Waiting for review feedback read.');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, this.assessmentService.saveFeedbackReviewed(this.submission.id).toPromise()];
                    case 2:
                        result = _a.sent();
                        this.feedbackReviewed = true;
                        this.newRelic.actionText('Review feedback read.');
                        this.continueBtnLoading = false;
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _a.sent();
                        return [4 /*yield*/, this.notificationService.alert({
                                header: 'Marking feedback as read failed',
                                message: err_2.msg || JSON.stringify(err_2)
                            })];
                    case 4:
                        toasted = _a.sent();
                        this.continueBtnLoading = false;
                        throw new Error(err_2);
                    case 5:
                        // After marking feedback as read, popup review rating modal if
                        // 1. review is successfully marked as read (from above)
                        // 2. hasReviewRating (activation): program configuration is set to enable review rating
                        if (!result.success || !this.storage.getUser().hasReviewRating) {
                            return [2 /*return*/];
                        }
                        this.continueBtnLoading = true;
                        this.newRelic.actionText('Waiting for review rating API response.');
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 10]);
                        // display review rating modal
                        return [4 /*yield*/, this.assessmentService.popUpReviewRating(this.review.id, false)];
                    case 7:
                        // display review rating modal
                        _a.sent();
                        this.continueBtnLoading = false;
                        return [3 /*break*/, 10];
                    case 8:
                        err_3 = _a.sent();
                        msg = 'Can not get review rating information';
                        this.newRelic.noticeError(msg);
                        return [4 /*yield*/, this.notificationService.alert({
                                header: msg,
                                message: err_3.msg || JSON.stringify(err_3)
                            })];
                    case 9:
                        toasted = _a.sent();
                        this.continueBtnLoading = false;
                        throw new Error(err_3);
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AssessmentComponent.prototype.showQuestionInfo = function (info) {
        this.newRelic.actionText('Read question info.');
        this.notificationService.popUp('shortMessage', { message: info });
    };
    AssessmentComponent.prototype._getCurrentTime = function () {
        return new Intl.DateTimeFormat('en-GB', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(new Date());
    };
    AssessmentComponent.prototype.hasFooter = function () {
        return this.loadingSubmission || this.loadingFeedbackReviewed || this.doAssessment || this.doReview || this.footerText();
    };
    /**
     * Get the text on the left of the footer.
     * Return false if it shouldn't be displayed
     */
    AssessmentComponent.prototype.footerText = function () {
        // if it is to do assessment or do review
        if (this.doAssessment || this.doReview) {
            if (this.submitting) {
                return 'submitting';
            }
            if (this.submitted) {
                return 'submitted';
            }
            // display the submit button, don't need the text in the footer
            return false;
        }
        if (this.action === 'review') {
            return false;
        }
        switch (this.submission.status) {
            case 'published':
                if (this.feedbackReviewed) {
                    return 'done';
                }
                return 'feedback available';
            case 'pending approval':
                return 'pending review';
            default:
                return this.submission.status;
        }
    };
    AssessmentComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _assessment_service__WEBPACK_IMPORTED_MODULE_2__["AssessmentService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_6__["BrowserStorageService"] },
        { type: _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"] },
        { type: _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__["ActivityService"] },
        { type: _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_10__["FastFeedbackService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__["NewRelicService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AssessmentComponent.prototype, "inputId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AssessmentComponent.prototype, "inputActivityId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AssessmentComponent.prototype, "inputSubmissionId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AssessmentComponent.prototype, "inputContextId", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], AssessmentComponent.prototype, "inputAction", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AssessmentComponent.prototype, "fromPage", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AssessmentComponent.prototype, "navigate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AssessmentComponent.prototype, "changeStatus", void 0);
    AssessmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-assessment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./assessment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/assessment/assessment.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./assessment.component.scss */ "./src/app/assessment/assessment.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _assessment_service__WEBPACK_IMPORTED_MODULE_2__["AssessmentService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_3__["UtilsService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_6__["BrowserStorageService"],
            _services_shared_service__WEBPACK_IMPORTED_MODULE_8__["SharedService"],
            _activity_activity_service__WEBPACK_IMPORTED_MODULE_9__["ActivityService"],
            _fast_feedback_fast_feedback_service__WEBPACK_IMPORTED_MODULE_10__["FastFeedbackService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _shared_new_relic_new_relic_service__WEBPACK_IMPORTED_MODULE_11__["NewRelicService"]])
    ], AssessmentComponent);
    return AssessmentComponent;
}(_services_router_enter_service__WEBPACK_IMPORTED_MODULE_7__["RouterEnter"]));



/***/ }),

/***/ "./src/app/assessment/assessment.module.ts":
/*!*************************************************!*\
  !*** ./src/app/assessment/assessment.module.ts ***!
  \*************************************************/
/*! exports provided: AssessmentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentModule", function() { return AssessmentModule; });
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _assessment_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assessment-routing.module */ "./src/app/assessment/assessment-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _assessment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assessment.component */ "./src/app/assessment/assessment.component.ts");
/* harmony import */ var _questions_questions_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../questions/questions.module */ "./src/app/questions/questions.module.ts");
/* harmony import */ var _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../activity/activity.module */ "./src/app/activity/activity.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







var AssessmentModule = /** @class */ (function () {
    function AssessmentModule() {
    }
    AssessmentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
                _assessment_routing_module__WEBPACK_IMPORTED_MODULE_2__["AssessmentRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _questions_questions_module__WEBPACK_IMPORTED_MODULE_5__["QuestionsModule"],
                _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__["ActivityModule"],
            ],
            declarations: [
                _assessment_component__WEBPACK_IMPORTED_MODULE_4__["AssessmentComponent"]
            ],
            exports: [
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__["SharedModule"],
                _activity_activity_module__WEBPACK_IMPORTED_MODULE_6__["ActivityModule"],
                _assessment_component__WEBPACK_IMPORTED_MODULE_4__["AssessmentComponent"]
            ]
        })
    ], AssessmentModule);
    return AssessmentModule;
}());



/***/ }),

/***/ "./src/app/assessment/assessment.service.ts":
/*!**************************************************!*\
  !*** ./src/app/assessment/assessment.service.ts ***!
  \**************************************************/
/*! exports provided: AssessmentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssessmentService", function() { return AssessmentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/request/request.service */ "./src/app/shared/request/request.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
/* harmony import */ var _services_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/storage.service */ "./src/app/services/storage.service.ts");
/* harmony import */ var _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/notification/notification.service */ "./src/app/shared/notification/notification.service.ts");
/* harmony import */ var _review_rating_review_rating_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../review-rating/review-rating.component */ "./src/app/review-rating/review-rating.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
var api = {
    get: {
        assessment: 'api/assessments.json',
        submissions: 'api/submissions.json',
        todoitem: 'api/v2/motivations/todo_item/list.json'
    },
    post: {
        submissions: 'api/assessment_submissions.json',
        reviews: 'api/feedback_submissions.json',
        todoitem: 'api/v2/motivations/todo_item/edit.json'
    }
};
var AssessmentService = /** @class */ (function () {
    function AssessmentService(request, utils, storage, notification, sanitizer) {
        this.request = request;
        this.utils = utils;
        this.storage = storage;
        this.notification = notification;
        this.sanitizer = sanitizer;
        this.questions = {};
    }
    AssessmentService.prototype.getAssessment = function (id, action) {
        var _this = this;
        return this.request.get(api.get.assessment, { params: {
                assessment_id: id,
                structured: true,
                review: (action === 'review') ? true : false
            } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && response.data) {
                return _this._normaliseAssessment(response.data);
            }
            else {
                return {};
            }
        }));
    };
    AssessmentService.prototype._normaliseAssessment = function (data) {
        var _this = this;
        // In API response, 'data' is an array of assessments
        // (since we passed assessment id, it will return only one assessment, but still in array format).
        // That's why we use data[0]
        if (!Array.isArray(data) ||
            !this.utils.has(data[0], 'Assessment') ||
            !this.utils.has(data[0], 'AssessmentGroup')) {
            return this.request.apiResponseFormatError('Assessment format error');
        }
        var thisAssessment = data[0];
        var assessment = {
            name: thisAssessment.Assessment.name,
            type: thisAssessment.Assessment.assessment_type,
            description: thisAssessment.Assessment.description,
            isForTeam: thisAssessment.Assessment.is_team,
            dueDate: thisAssessment.Assessment.deadline,
            isOverdue: thisAssessment.Assessment.deadline ? this.utils.timeComparer(thisAssessment.Assessment.deadline) < 0 : false,
            groups: [],
            pulseCheck: thisAssessment.Assessment.pulse_check
        };
        thisAssessment.AssessmentGroup.forEach(function (group) {
            if (!_this.utils.has(group, 'name') ||
                !_this.utils.has(group, 'description') ||
                !_this.utils.has(group, 'AssessmentGroupQuestion') ||
                !Array.isArray(group.AssessmentGroupQuestion)) {
                return _this.request.apiResponseFormatError('Assessment.AssessmentGroup format error');
            }
            var questions = [];
            group.AssessmentGroupQuestion.forEach(function (question) {
                if (!_this.utils.has(question, 'AssessmentQuestion')) {
                    return _this.request.apiResponseFormatError('Assessment.AssessmentGroupQuestion format error');
                }
                if (!_this.utils.has(question.AssessmentQuestion, 'id') ||
                    !_this.utils.has(question.AssessmentQuestion, 'name') ||
                    !_this.utils.has(question.AssessmentQuestion, 'description') ||
                    !_this.utils.has(question.AssessmentQuestion, 'question_type') ||
                    !_this.utils.has(question.AssessmentQuestion, 'is_required') ||
                    !_this.utils.has(question.AssessmentQuestion, 'has_comment') ||
                    !_this.utils.has(question.AssessmentQuestion, 'can_answer') ||
                    !_this.utils.has(question.AssessmentQuestion, 'audience')) {
                    return _this.request.apiResponseFormatError('Assessment.AssessmentQuestion format error');
                }
                // save question to "questions" object, for later use in normaliseSubmission()
                _this.questions[question.AssessmentQuestion.id] = question.AssessmentQuestion;
                var audience = question.AssessmentQuestion.audience;
                var questionObject = {
                    id: question.AssessmentQuestion.id,
                    name: question.AssessmentQuestion.name,
                    type: question.AssessmentQuestion.question_type,
                    description: question.AssessmentQuestion.description,
                    isRequired: question.AssessmentQuestion.is_required,
                    canComment: question.AssessmentQuestion.has_comment,
                    canAnswer: question.AssessmentQuestion.can_answer,
                    audience: audience,
                    submitterOnly: audience.length === 1 && audience.includes('submitter'),
                    reviewerOnly: audience.length === 1 && audience.includes('reviewer')
                };
                switch (question.AssessmentQuestion.question_type) {
                    case 'oneof':
                    case 'multiple':
                        if (!_this.utils.has(question.AssessmentQuestion, 'AssessmentQuestionChoice') ||
                            !Array.isArray(question.AssessmentQuestion.AssessmentQuestionChoice)) {
                            return _this.request.apiResponseFormatError('Assessment.AssessmentQuestionChoice format error');
                        }
                        var choices_1 = [];
                        var info_1 = '';
                        question.AssessmentQuestion.AssessmentQuestionChoice.forEach(function (questionChoice) {
                            if (!_this.utils.has(questionChoice, 'id') ||
                                !_this.utils.has(questionChoice, 'AssessmentChoice.name')) {
                                return _this.request.apiResponseFormatError('Assessment.AssessmentChoice format error');
                            }
                            // Here we use the AssessmentQuestionChoice.id (instead of AssessmentChoice.id) as the choice id,
                            // this is the current logic from Practera server
                            choices_1.push({
                                id: questionChoice.id,
                                name: questionChoice.AssessmentChoice.name,
                                explanation: _this.utils.has(questionChoice, 'AssessmentChoice.explanation') ? questionChoice.AssessmentChoice.explanation : ''
                            });
                            if (_this.utils.has(questionChoice, 'AssessmentChoice.description') && questionChoice.AssessmentChoice.description) {
                                info_1 += '<p>' + questionChoice.AssessmentChoice.name + ' - ' + questionChoice.AssessmentChoice.description + '</p>';
                            }
                        });
                        if (info_1) {
                            // Add the title
                            info_1 = '<h3>Choice Description:</h3>' + info_1;
                        }
                        questionObject['info'] = info_1;
                        questionObject['choices'] = choices_1;
                        break;
                    case 'file':
                        if (!_this.utils.has(question.AssessmentQuestion, 'file_type.type')) {
                            return _this.request.apiResponseFormatError('Assessment.AssessmentQuestion.file_type format error');
                        }
                        questionObject['fileType'] = question.AssessmentQuestion.file_type.type;
                        break;
                    case 'team member selector':
                        if (!_this.utils.has(question.AssessmentQuestion, 'TeamMember') ||
                            !Array.isArray(question.AssessmentQuestion.TeamMember)) {
                            return _this.request.apiResponseFormatError('Assessment.TeamMember format error');
                        }
                        var teamMembers_1 = [];
                        question.AssessmentQuestion.TeamMember.forEach(function (teamMember) {
                            if (!_this.utils.has(teamMember, 'userName')) {
                                return _this.request.apiResponseFormatError('Assessment.TeamMember format error');
                            }
                            teamMembers_1.push({
                                key: JSON.stringify(teamMember),
                                userName: teamMember.userName
                            });
                        });
                        questionObject['teamMembers'] = teamMembers_1;
                        break;
                }
                questions.push(questionObject);
            });
            if (!_this.utils.isEmpty(questions)) {
                assessment.groups.push({
                    name: group.name,
                    description: group.description,
                    questions: questions
                });
            }
        });
        return assessment;
    };
    AssessmentService.prototype.getSubmission = function (assessmentId, contextId, action, submissionId) {
        var _this = this;
        var params;
        if (action === 'review') {
            params = {
                assessment_id: assessmentId,
                context_id: contextId,
                review: true
            };
        }
        else {
            params = {
                assessment_id: assessmentId,
                context_id: contextId,
                review: false
            };
        }
        if (submissionId) {
            params['id'] = submissionId;
        }
        return this.request.get(api.get.submissions, { params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && !_this.utils.isEmpty(response.data)) {
                return _this._normaliseSubmission(response.data, action);
            }
            else {
                return {
                    submission: {},
                    review: {}
                };
            }
        }));
    };
    AssessmentService.prototype._normaliseSubmission = function (data, action) {
        var _this = this;
        // In API response, 'data' is an array of submissions
        // (currently we only support one submission per assessment, but it is still in array format).
        // That's why we use data[0]
        if (!Array.isArray(data) ||
            !this.utils.has(data[0], 'AssessmentSubmission')) {
            return this.request.apiResponseFormatError('AssessmentSubmission format error');
        }
        var thisSubmission = data[0];
        var submission = {
            id: thisSubmission.AssessmentSubmission.id,
            status: thisSubmission.AssessmentSubmission.status,
            answers: {},
            submitterName: thisSubmission.Submitter.name,
            modified: thisSubmission.AssessmentSubmission.modified,
            isLocked: thisSubmission.AssessmentSubmission.is_locked,
            submitterImage: thisSubmission.Submitter.image,
            reviewerName: this.checkReviewer(thisSubmission.Reviewer)
        };
        // -- normalise submission answers
        if (!this.utils.has(thisSubmission, 'AssessmentSubmissionAnswer') ||
            !Array.isArray(thisSubmission.AssessmentSubmissionAnswer)) {
            return this.request.apiResponseFormatError('AssessmentSubmissionAnswer format error');
        }
        thisSubmission.AssessmentSubmissionAnswer.forEach(function (answer) {
            if (!_this.utils.has(answer, 'assessment_question_id') ||
                !_this.utils.has(answer, 'answer')) {
                return _this.request.apiResponseFormatError('AssessmentSubmissionAnswer.answer format error');
            }
            answer.answer = _this._normaliseAnswer(answer.assessment_question_id, answer.answer);
            submission.answers[answer.assessment_question_id] = {
                answer: answer.answer
            };
            if (submission.status === 'published' || submission.status === 'done') {
                submission = _this._addChoiceExplanation(answer, submission);
            }
        });
        // -- normalise reviewer answers
        var review;
        // AssessmentReview is in array format, current we only support one review per submission, that's why we use AssessmentReview[0]
        if (this.utils.has(thisSubmission, 'AssessmentReview[0].id')) {
            review = {
                id: thisSubmission.AssessmentReview[0].id,
                answers: {},
                status: thisSubmission.AssessmentReview[0].status,
                modified: thisSubmission.AssessmentReview[0].modified
            };
        }
        // only get the review answer if the review is published (submission.status === 'published') or this is from /assessment/review
        if ((submission.status === 'published' || action === 'review') &&
            this.utils.has(thisSubmission, 'AssessmentReviewAnswer') &&
            Array.isArray(thisSubmission.AssessmentReviewAnswer)) {
            if (!review) {
                review = {
                    // we use the review id in this way only if AssessmentReviewAnswer is not returned,
                    // we should change API so that it returns AssessmentReviewAnswer object later
                    id: thisSubmission.AssessmentReviewAnswer[0].assessment_review_id,
                    answers: {},
                    status: '',
                    modified: ''
                };
            }
            thisSubmission.AssessmentReviewAnswer.forEach(function (answer) {
                if (!_this.utils.has(answer, 'assessment_question_id') ||
                    !_this.utils.has(answer, 'answer') ||
                    !_this.utils.has(answer, 'comment')) {
                    return _this.request.apiResponseFormatError('AssessmentReviewAnswer format error');
                }
                answer.answer = _this._normaliseAnswer(answer.assessment_question_id, answer.answer);
                review.answers[answer.assessment_question_id] = {
                    answer: answer.answer,
                    comment: answer.comment
                };
            });
        }
        return {
            submission: submission,
            review: review ? review : {}
        };
    };
    /**
     * For each question that has choice (oneof & multiple), show the choice explanation in the submission if it is not empty
     */
    AssessmentService.prototype._addChoiceExplanation = function (submissionAnswer, submission) {
        var _this = this;
        var questionId = submissionAnswer.assessment_question_id;
        var answer = submissionAnswer.answer;
        // don't do anything if there's no choices
        if (this.utils.isEmpty(this.questions[questionId].AssessmentQuestionChoice)) {
            return submission;
        }
        var explanation = '';
        if (Array.isArray(answer)) {
            // multiple question
            this.questions[questionId].AssessmentQuestionChoice.forEach(function (choice) {
                // only display the explanation if it is not empty
                if (answer.includes(choice.id) && !_this.utils.isEmpty(choice.explanation)) {
                    explanation += choice.AssessmentChoice.name + ' - ' + choice.explanation + '\n';
                }
            });
        }
        else {
            // oneof question
            this.questions[questionId].AssessmentQuestionChoice.forEach(function (choice) {
                // only display the explanation if it is not empty
                if (answer === choice.id && !_this.utils.isEmpty(choice.explanation)) {
                    explanation = choice.explanation;
                }
            });
        }
        // put the explanation in the submission
        var thisExplanation = explanation.replace(/text-align: center;/gi, 'text-align: center; text-align: -webkit-center;');
        submission.answers[questionId].explanation = this.sanitizer.bypassSecurityTrustHtml(thisExplanation);
        return submission;
    };
    AssessmentService.prototype._normaliseAnswer = function (questionId, answer) {
        if (this.questions[questionId]) {
            switch (this.questions[questionId].question_type) {
                case 'oneof':
                    // re-format answer from string to number
                    if (typeof answer === 'string' && answer.length === 0) {
                        // Caution: let answer be null if question wasn't answered previously, 0 could be a possible answer ID
                        answer = null;
                    }
                    else {
                        answer = +answer;
                    }
                    break;
                case 'multiple':
                    if (this.utils.isEmpty(answer)) {
                        answer = [];
                    }
                    if (!Array.isArray(answer)) {
                        // re-format json string to array
                        answer = JSON.parse(answer);
                    }
                    // re-format answer from string to number
                    answer = answer.map(function (value) {
                        return +value;
                    });
                    break;
            }
        }
        return answer;
    };
    AssessmentService.prototype.saveAnswers = function (assessment, answers, action, submissionId) {
        var postData;
        switch (action) {
            case 'assessment':
                postData = {
                    Assessment: assessment,
                    AssessmentSubmissionAnswer: answers
                };
                if (submissionId) {
                    postData.AssessmentSubmission = {
                        id: submissionId
                    };
                }
                return this.request.post(api.post.submissions, postData);
            case 'review':
                postData = {
                    Assessment: assessment,
                    AssessmentReviewAnswer: answers
                };
                return this.request.post(api.post.reviews, postData);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({
            success: false
        });
    };
    AssessmentService.prototype.getFeedbackReviewed = function (submissionId) {
        var _this = this;
        return this.request.get(api.get.todoitem, { params: {
                project_id: this.storage.getUser().projectId,
                identifier: 'AssessmentSubmission-' + submissionId
            } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            if (response.success && !_this.utils.isEmpty(response.data)) {
                return _this._normaliseFeedbackReviewed(response.data);
            }
            else {
                return false;
            }
        }));
    };
    AssessmentService.prototype._normaliseFeedbackReviewed = function (data) {
        // In API response, 'data' is an array of todo items.
        // Since we passed "identifier", there should be just one in the array. That's why we use data[0]
        if (!Array.isArray(data) ||
            !this.utils.has(data[0], 'is_done')) {
            return this.request.apiResponseFormatError('TodoItem format error');
        }
        return data[0].is_done;
    };
    AssessmentService.prototype.saveFeedbackReviewed = function (submissionId) {
        var postData = {
            project_id: this.storage.getUser().projectId,
            identifier: 'AssessmentSubmission-' + submissionId,
            is_done: true
        };
        return this.request.post(api.post.todoitem, postData);
    };
    AssessmentService.prototype.popUpReviewRating = function (reviewId, redirect) {
        return this.notification.modal(_review_rating_review_rating_component__WEBPACK_IMPORTED_MODULE_7__["ReviewRatingComponent"], {
            reviewId: reviewId,
            redirect: redirect
        });
    };
    AssessmentService.prototype.checkReviewer = function (reviewer) {
        if (!reviewer) {
            return undefined;
        }
        return reviewer.name !== this.storage.getUser().name ? reviewer.name : undefined;
    };
    AssessmentService.ctorParameters = function () { return [
        { type: _shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"] },
        { type: _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"] },
        { type: _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"] }
    ]; };
    AssessmentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_request_request_service__WEBPACK_IMPORTED_MODULE_3__["RequestService"],
            _services_utils_service__WEBPACK_IMPORTED_MODULE_4__["UtilsService"],
            _services_storage_service__WEBPACK_IMPORTED_MODULE_5__["BrowserStorageService"],
            _shared_notification_notification_service__WEBPACK_IMPORTED_MODULE_6__["NotificationService"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["DomSanitizer"]])
    ], AssessmentService);
    return AssessmentService;
}());



/***/ }),

/***/ "./src/app/questions/file/file-display/file-display.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/questions/file/file-display/file-display.component.scss ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("video {\n  width: 100%;\n}\n\n.warning {\n  font-weight: 400;\n  font-size: 16px;\n  white-space: normal;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9xdWVzdGlvbnMvZmlsZS9maWxlLWRpc3BsYXkvZmlsZS1kaXNwbGF5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9xdWVzdGlvbnMvZmlsZS9maWxlLWRpc3BsYXkvZmlsZS1kaXNwbGF5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3F1ZXN0aW9ucy9maWxlL2ZpbGUtZGlzcGxheS9maWxlLWRpc3BsYXkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ2aWRlbyB7XG4gIHdpZHRoOiAxMDAlXG59XG5cbi53YXJuaW5nIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuIiwidmlkZW8ge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLndhcm5pbmcge1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDE2cHg7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59Il19 */");

/***/ }),

/***/ "./src/app/questions/file/file-display/file-display.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/questions/file/file-display/file-display.component.ts ***!
  \***********************************************************************/
/*! exports provided: FileDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDisplayComponent", function() { return FileDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/filestack/filestack.service */ "./src/app/shared/filestack/filestack.service.ts");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var FileDisplayComponent = /** @class */ (function () {
    function FileDisplayComponent(filestackService, utils) {
        this.filestackService = filestackService;
        this.utils = utils;
        this.fileType = 'any';
    }
    FileDisplayComponent.prototype.ngOnInit = function () {
        if (this.file && this.file.workflows) {
            this.updateWorkflowStatus();
        }
    };
    FileDisplayComponent.prototype.resetUILogic = function () {
        this.virusDetection = {};
        this.quarantine = {};
        this.video.nativeElement.load();
    };
    FileDisplayComponent.prototype.updateWorkflowStatus = function (file) {
        var _this = this;
        this.resetUILogic();
        var currentFile = file || this.file;
        this.filestackService.getWorkflowStatus(currentFile.workflows).then(function (responds) {
            _this.utils.each((responds || []), function (res) {
                var results = res.results, status = res.status;
                if (status.toLowerCase() === 'finished') { // status: Finished / InProgress
                    var virus_detection = results.virus_detection, quarantine = results.quarantine;
                    if (_this.utils.isEmpty(_this.virusDetection) && virus_detection && virus_detection.data) {
                        _this.virusDetection = virus_detection.data;
                    }
                    if (_this.utils.isEmpty(_this.quarantine) && quarantine && quarantine.data) {
                        _this.quarantine = quarantine.data;
                    }
                }
            });
        });
    };
    FileDisplayComponent.prototype.ngOnChanges = function (change) {
        if (change.file.currentValue && change.file.currentValue.workflows) {
            this.updateWorkflowStatus(change.file.currentValue);
        }
    };
    FileDisplayComponent.prototype.previewFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.filestackService.previewFile(file)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileDisplayComponent.ctorParameters = function () { return [
        { type: _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_1__["FilestackService"] },
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileDisplayComponent.prototype, "fileType", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileDisplayComponent.prototype, "file", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('video'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], FileDisplayComponent.prototype, "video", void 0);
    FileDisplayComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-file-display',
            template: __importDefault(__webpack_require__(/*! raw-loader!./file-display.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file-display/file-display.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./file-display.component.scss */ "./src/app/questions/file/file-display/file-display.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_1__["FilestackService"], _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], FileDisplayComponent);
    return FileDisplayComponent;
}());



/***/ }),

/***/ "./src/app/questions/file/file.component.scss":
/*!****************************************************!*\
  !*** ./src/app/questions/file/file.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3F1ZXN0aW9ucy9maWxlL2ZpbGUuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/questions/file/file.component.ts":
/*!**************************************************!*\
  !*** ./src/app/questions/file/file.component.ts ***!
  \**************************************************/
/*! exports provided: FileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileComponent", function() { return FileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/filestack/filestack.service */ "./src/app/shared/filestack/filestack.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var FileComponent = /** @class */ (function () {
    function FileComponent(filestackService) {
        this.filestackService = filestackService;
        this.question = {
            name: '',
            description: '',
            isRequired: false,
            fileType: 'any'
        };
        // call back for save changes
        this.saveProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.fileTypes = '';
        // validation errors array
        this.errors = [];
        // propagate changes into the form control
        this.propagateChange = function (_) { };
    }
    FileComponent_1 = FileComponent;
    FileComponent.prototype.ngOnInit = function () {
        this.fileTypes = this.filestackService.getFileTypes(this.question.fileType);
        this._showSavedAnswers();
    };
    FileComponent.prototype.onFileUploadCompleted = function (file, type) {
        if (type === void 0) { type = null; }
        if (file.success) {
            // reset errors
            this.errors = [];
            // currently we only support one file upload per question,
            // if we need to support multiple file upload later, we need to change this to:
            // this.uploadedFiles = push(file.data);
            this.uploadedFile = file.data;
            this.onChange('', type);
        }
        else {
            // display error message for user
            this.errors.push('File upload failed, please try again later.');
        }
    };
    // event fired when file is uploaded. propagate the change up to the form control using the custom value accessor interface
    // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
    FileComponent.prototype.onChange = function (value, type) {
        // set changed value (answer or comment)
        if (type) {
            if (!this.innerValue) {
                this.innerValue = {
                    answer: {},
                    comment: ''
                };
            }
            if (type === 'comment') {
                // just pass the value for comment since comment is always just text
                this.innerValue.comment = value;
            }
            else {
                this.innerValue.answer = this.uploadedFile;
            }
        }
        else {
            // this is for submitter, just pass the uploaded file as the answer
            this.innerValue = this.uploadedFile;
        }
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
        this.saveProgress.emit(true);
    };
    // From ControlValueAccessor interface
    FileComponent.prototype.writeValue = function (value) {
        if (value) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    FileComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // From ControlValueAccessor interface
    FileComponent.prototype.registerOnTouched = function (fn) {
    };
    // adding save values to from control
    FileComponent.prototype._showSavedAnswers = function () {
        if ((this.reviewStatus === 'in progress') && (this.doReview)) {
            this.innerValue = {
                answer: {},
                comment: ''
            };
            this.innerValue.comment = this.review.comment;
            this.comment = this.review.comment;
            this.innerValue.answer = this.review.answer;
        }
        if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
            this.innerValue = this.submission.answer;
        }
        this.propagateChange(this.innerValue);
        this.control.setValue(this.innerValue);
    };
    var FileComponent_1;
    FileComponent.ctorParameters = function () { return [
        { type: _shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_2__["FilestackService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "question", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "submission", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "review", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "reviewStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "submissionStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FileComponent.prototype, "doAssessment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], FileComponent.prototype, "doReview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"])
    ], FileComponent.prototype, "control", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('answer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], FileComponent.prototype, "answerRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('commentEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], FileComponent.prototype, "commentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FileComponent.prototype, "saveProgress", void 0);
    FileComponent = FileComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-file',
            template: __importDefault(__webpack_require__(/*! raw-loader!./file.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/file/file.component.html")).default,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return FileComponent_1; }),
                }
            ],
            styles: [__importDefault(__webpack_require__(/*! ./file.component.scss */ "./src/app/questions/file/file.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_filestack_filestack_service__WEBPACK_IMPORTED_MODULE_2__["FilestackService"]])
    ], FileComponent);
    return FileComponent;
}());



/***/ }),

/***/ "./src/app/questions/multiple/multiple.component.scss":
/*!************************************************************!*\
  !*** ./src/app/questions/multiple/multiple.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-item ion-label {\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9xdWVzdGlvbnMvbXVsdGlwbGUvbXVsdGlwbGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3F1ZXN0aW9ucy9tdWx0aXBsZS9tdWx0aXBsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9xdWVzdGlvbnMvbXVsdGlwbGUvbXVsdGlwbGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbSBpb24tbGFiZWwge1xuICAgIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn0iLCJpb24taXRlbSBpb24tbGFiZWwge1xuICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/questions/multiple/multiple.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/questions/multiple/multiple.component.ts ***!
  \**********************************************************/
/*! exports provided: MultipleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultipleComponent", function() { return MultipleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var MultipleComponent = /** @class */ (function () {
    function MultipleComponent(utils) {
        this.utils = utils;
        // call back for save changes
        this.saveProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // validation errors array
        this.errors = [];
        // propagate changes into the form control
        this.propagateChange = function (_) { };
    }
    MultipleComponent_1 = MultipleComponent;
    MultipleComponent.prototype.ngOnInit = function () {
        this._showSavedAnswers();
    };
    // event fired when checkbox is selected/unselected. propagate the change up to the form control using the custom value accessor interface
    // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
    MultipleComponent.prototype.onChange = function (value, type) {
        // innerValue should be either array or object, if it is a string, parse it
        if (typeof this.innerValue === 'string') {
            this.innerValue = JSON.parse(this.innerValue);
        }
        // set changed value (answer or comment)
        if (type) {
            // initialise innerValue if not set
            if (!this.innerValue) {
                this.innerValue = {
                    answer: [],
                    comment: ''
                };
            }
            if (type === 'comment') {
                // just pass the value for comment since comment is always just text
                this.innerValue.comment = value;
            }
            else {
                this.innerValue.answer = this.utils.addOrRemove(this.innerValue.answer, value);
            }
        }
        else {
            if (!this.innerValue) {
                this.innerValue = [];
            }
            this.innerValue = this.utils.addOrRemove(this.innerValue, value);
        }
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
        // reset errors
        this.errors = [];
        // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the answer area
        for (var key in this.control.errors) {
            if (key === 'required') {
                this.errors.push('This question is required');
            }
            else {
                this.errors.push(this.control.errors[key]);
            }
        }
        this.saveProgress.emit(true);
    };
    // From ControlValueAccessor interface
    MultipleComponent.prototype.writeValue = function (value) {
        if (value) {
            this.innerValue = JSON.stringify(value);
        }
    };
    // From ControlValueAccessor interface
    MultipleComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // From ControlValueAccessor interface
    MultipleComponent.prototype.registerOnTouched = function (fn) {
    };
    // adding save values to from control
    MultipleComponent.prototype._showSavedAnswers = function () {
        if ((this.reviewStatus === 'in progress') && (this.doReview)) {
            this.innerValue = {
                answer: this.review.answer,
                comment: this.review.comment
            };
            this.comment = this.review.comment;
        }
        if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
            this.innerValue = this.submission.answer;
        }
        this.propagateChange(this.innerValue);
        this.control.setValue(this.innerValue);
    };
    var MultipleComponent_1;
    MultipleComponent.ctorParameters = function () { return [
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "question", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "submission", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "review", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "reviewStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "submissionStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], MultipleComponent.prototype, "doAssessment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], MultipleComponent.prototype, "doReview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"])
    ], MultipleComponent.prototype, "control", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('answer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MultipleComponent.prototype, "answerRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('commentEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], MultipleComponent.prototype, "commentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], MultipleComponent.prototype, "saveProgress", void 0);
    MultipleComponent = MultipleComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-multiple',
            template: __importDefault(__webpack_require__(/*! raw-loader!./multiple.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/multiple/multiple.component.html")).default,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MultipleComponent_1; }),
                }
            ],
            styles: [__importDefault(__webpack_require__(/*! ./multiple.component.scss */ "./src/app/questions/multiple/multiple.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], MultipleComponent);
    return MultipleComponent;
}());



/***/ }),

/***/ "./src/app/questions/oneof/oneof.component.scss":
/*!******************************************************!*\
  !*** ./src/app/questions/oneof/oneof.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-radio-group ion-item ion-label {\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9xdWVzdGlvbnMvb25lb2Yvb25lb2YuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3F1ZXN0aW9ucy9vbmVvZi9vbmVvZi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9xdWVzdGlvbnMvb25lb2Yvb25lb2YuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tcmFkaW8tZ3JvdXAgaW9uLWl0ZW0gaW9uLWxhYmVsIHtcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG59XG4iLCJpb24tcmFkaW8tZ3JvdXAgaW9uLWl0ZW0gaW9uLWxhYmVsIHtcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/questions/oneof/oneof.component.ts":
/*!****************************************************!*\
  !*** ./src/app/questions/oneof/oneof.component.ts ***!
  \****************************************************/
/*! exports provided: OneofComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneofComponent", function() { return OneofComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/utils.service */ "./src/app/services/utils.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var OneofComponent = /** @class */ (function () {
    function OneofComponent(utils) {
        this.utils = utils;
        // call back for save changes
        this.saveProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // validation errors array
        this.errors = [];
        // propagate changes into the form control
        this.propagateChange = function (_) { };
    }
    OneofComponent_1 = OneofComponent;
    OneofComponent.prototype.ngOnInit = function () {
        this._showSavedAnswers();
    };
    // event fired when radio is selected. propagate the change up to the form control using the custom value accessor interface
    // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
    OneofComponent.prototype.onChange = function (value, type) {
        // set changed value (answer or comment)
        if (type) {
            // initialise innerValue if not set
            if (!this.innerValue) {
                this.innerValue = {
                    answer: '',
                    comment: ''
                };
            }
            this.innerValue[type] = value;
        }
        else {
            this.innerValue = value;
        }
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
        // reset errors
        this.errors = [];
        // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the answer area
        for (var key in this.control.errors) {
            if (key === 'required') {
                this.errors.push('This question is required');
            }
            else {
                this.errors.push(this.control.errors[key]);
            }
        }
        this.saveProgress.emit(true);
    };
    // From ControlValueAccessor interface
    OneofComponent.prototype.writeValue = function (value) {
        if (value) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    OneofComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // From ControlValueAccessor interface
    OneofComponent.prototype.registerOnTouched = function (fn) {
    };
    // adding save values to from control
    OneofComponent.prototype._showSavedAnswers = function () {
        if ((this.reviewStatus === 'in progress') && (this.doReview)) {
            this.innerValue = {
                answer: '',
                comment: ''
            };
            this.innerValue.comment = this.review.comment;
            this.comment = this.review.comment;
            this.innerValue.answer = this.review.answer;
        }
        if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
            this.innerValue = this.submission.answer;
        }
        this.propagateChange(this.innerValue);
        this.control.setValue(this.innerValue);
    };
    var OneofComponent_1;
    OneofComponent.ctorParameters = function () { return [
        { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "question", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "submission", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "review", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "reviewStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "submissionStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], OneofComponent.prototype, "doAssessment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], OneofComponent.prototype, "doReview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"])
    ], OneofComponent.prototype, "control", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('answerEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], OneofComponent.prototype, "answerRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('commentEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], OneofComponent.prototype, "commentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], OneofComponent.prototype, "saveProgress", void 0);
    OneofComponent = OneofComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-oneof',
            template: __importDefault(__webpack_require__(/*! raw-loader!./oneof.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/oneof/oneof.component.html")).default,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return OneofComponent_1; }),
                }
            ],
            styles: [__importDefault(__webpack_require__(/*! ./oneof.component.scss */ "./src/app/questions/oneof/oneof.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"]])
    ], OneofComponent);
    return OneofComponent;
}());



/***/ }),

/***/ "./src/app/questions/questions.component.ts":
/*!**************************************************!*\
  !*** ./src/app/questions/questions.component.ts ***!
  \**************************************************/
/*! exports provided: QuestionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsComponent", function() { return QuestionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

var QuestionsComponent = /** @class */ (function () {
    function QuestionsComponent() {
    }
    QuestionsComponent.prototype.ngOnInit = function () {
    };
    QuestionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-questions',
            template: '<ion-router-outlet></ion-router-outlet>'
        }),
        __metadata("design:paramtypes", [])
    ], QuestionsComponent);
    return QuestionsComponent;
}());



/***/ }),

/***/ "./src/app/questions/questions.module.ts":
/*!***********************************************!*\
  !*** ./src/app/questions/questions.module.ts ***!
  \***********************************************/
/*! exports provided: QuestionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionsModule", function() { return QuestionsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _questions_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./questions.component */ "./src/app/questions/questions.component.ts");
/* harmony import */ var _text_text_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./text/text.component */ "./src/app/questions/text/text.component.ts");
/* harmony import */ var _oneof_oneof_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./oneof/oneof.component */ "./src/app/questions/oneof/oneof.component.ts");
/* harmony import */ var _multiple_multiple_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./multiple/multiple.component */ "./src/app/questions/multiple/multiple.component.ts");
/* harmony import */ var _file_file_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./file/file.component */ "./src/app/questions/file/file.component.ts");
/* harmony import */ var _team_member_selector_team_member_selector_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./team-member-selector/team-member-selector.component */ "./src/app/questions/team-member-selector/team-member-selector.component.ts");
/* harmony import */ var _file_file_display_file_display_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./file/file-display/file-display.component */ "./src/app/questions/file/file-display/file-display.component.ts");
/* harmony import */ var _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @shared/filestack/filestack.module */ "./src/app/shared/filestack/filestack.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var QuestionsModule = /** @class */ (function () {
    function QuestionsModule() {
    }
    QuestionsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _shared_filestack_filestack_module__WEBPACK_IMPORTED_MODULE_9__["FilestackModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
            ],
            declarations: [
                _questions_component__WEBPACK_IMPORTED_MODULE_2__["QuestionsComponent"],
                _text_text_component__WEBPACK_IMPORTED_MODULE_3__["TextComponent"],
                _oneof_oneof_component__WEBPACK_IMPORTED_MODULE_4__["OneofComponent"],
                _multiple_multiple_component__WEBPACK_IMPORTED_MODULE_5__["MultipleComponent"],
                _file_file_component__WEBPACK_IMPORTED_MODULE_6__["FileComponent"],
                _team_member_selector_team_member_selector_component__WEBPACK_IMPORTED_MODULE_7__["TeamMemberSelectorComponent"],
                _file_file_display_file_display_component__WEBPACK_IMPORTED_MODULE_8__["FileDisplayComponent"]
            ],
            exports: [
                _text_text_component__WEBPACK_IMPORTED_MODULE_3__["TextComponent"],
                _oneof_oneof_component__WEBPACK_IMPORTED_MODULE_4__["OneofComponent"],
                _multiple_multiple_component__WEBPACK_IMPORTED_MODULE_5__["MultipleComponent"],
                _file_file_component__WEBPACK_IMPORTED_MODULE_6__["FileComponent"],
                _team_member_selector_team_member_selector_component__WEBPACK_IMPORTED_MODULE_7__["TeamMemberSelectorComponent"]
            ]
        })
    ], QuestionsModule);
    return QuestionsModule;
}());



/***/ }),

/***/ "./src/app/questions/team-member-selector/team-member-selector.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/questions/team-member-selector/team-member-selector.component.scss ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-radio-group ion-item ion-label {\n  opacity: 1 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9xdWVzdGlvbnMvdGVhbS1tZW1iZXItc2VsZWN0b3IvdGVhbS1tZW1iZXItc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3F1ZXN0aW9ucy90ZWFtLW1lbWJlci1zZWxlY3Rvci90ZWFtLW1lbWJlci1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHFCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9xdWVzdGlvbnMvdGVhbS1tZW1iZXItc2VsZWN0b3IvdGVhbS1tZW1iZXItc2VsZWN0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tcmFkaW8tZ3JvdXAgaW9uLWl0ZW0gaW9uLWxhYmVsIHtcbiAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG59IiwiaW9uLXJhZGlvLWdyb3VwIGlvbi1pdGVtIGlvbi1sYWJlbCB7XG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/questions/team-member-selector/team-member-selector.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/questions/team-member-selector/team-member-selector.component.ts ***!
  \**********************************************************************************/
/*! exports provided: TeamMemberSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamMemberSelectorComponent", function() { return TeamMemberSelectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var TeamMemberSelectorComponent = /** @class */ (function () {
    function TeamMemberSelectorComponent() {
        // call back for save changes
        this.saveProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // validation errors array
        this.errors = [];
        // propagate changes into the form control
        this.propagateChange = function (_) { };
    }
    TeamMemberSelectorComponent_1 = TeamMemberSelectorComponent;
    TeamMemberSelectorComponent.prototype.ngOnInit = function () {
        this._showSavedAnswers();
    };
    // event fired when radio is selected. propagate the change up to the form control using the custom value accessor interface
    // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
    TeamMemberSelectorComponent.prototype.onChange = function (value, type) {
        // set changed value (answer or comment)
        if (type) {
            // initialise innerValue if not set
            if (!this.innerValue) {
                this.innerValue = {
                    answer: '',
                    comment: ''
                };
            }
            this.innerValue[type] = value;
        }
        else {
            this.innerValue = value;
        }
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
        // reset errors
        this.errors = [];
        // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the answer area
        for (var key in this.control.errors) {
            if (key === 'required') {
                this.errors.push('This question is required');
            }
            else {
                this.errors.push(this.control.errors[key]);
            }
        }
        this.saveProgress.emit(true);
    };
    // From ControlValueAccessor interface
    TeamMemberSelectorComponent.prototype.writeValue = function (value) {
        if (value) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    TeamMemberSelectorComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // From ControlValueAccessor interface
    TeamMemberSelectorComponent.prototype.registerOnTouched = function (fn) {
    };
    // adding save values to from control
    TeamMemberSelectorComponent.prototype._showSavedAnswers = function () {
        if ((this.reviewStatus === 'in progress') && (this.doReview)) {
            this.innerValue = {
                answer: '',
                comment: ''
            };
            this.innerValue.comment = this.review.comment;
            this.comment = this.review.comment;
            this.innerValue.answer = this.review.answer;
        }
        if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
            this.innerValue = this.submission.answer;
        }
        this.propagateChange(this.innerValue);
        this.control.setValue(this.innerValue);
    };
    var TeamMemberSelectorComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "question", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "submission", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "review", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "reviewStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "submissionStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TeamMemberSelectorComponent.prototype, "doAssessment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TeamMemberSelectorComponent.prototype, "doReview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"])
    ], TeamMemberSelectorComponent.prototype, "control", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('answerEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TeamMemberSelectorComponent.prototype, "answerRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('commentEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TeamMemberSelectorComponent.prototype, "commentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TeamMemberSelectorComponent.prototype, "saveProgress", void 0);
    TeamMemberSelectorComponent = TeamMemberSelectorComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-member-selector',
            template: __importDefault(__webpack_require__(/*! raw-loader!./team-member-selector.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/team-member-selector/team-member-selector.component.html")).default,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return TeamMemberSelectorComponent_1; }),
                }
            ],
            styles: [__importDefault(__webpack_require__(/*! ./team-member-selector.component.scss */ "./src/app/questions/team-member-selector/team-member-selector.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], TeamMemberSelectorComponent);
    return TeamMemberSelectorComponent;
}());



/***/ }),

/***/ "./src/app/questions/text/text.component.scss":
/*!****************************************************!*\
  !*** ./src/app/questions/text/text.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-textarea {\n  padding-left: 5px;\n  padding-right: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jaGF3L1dvcmtzcGFjZXMvd3d3L2ludGVyc2VjdGl2ZS9wcmFjdGVyYS1hcHAtdjIvc3JjL2FwcC9xdWVzdGlvbnMvdGV4dC90ZXh0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9xdWVzdGlvbnMvdGV4dC90ZXh0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvcXVlc3Rpb25zL3RleHQvdGV4dC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi10ZXh0YXJlYSB7XG4gICAgcGFkZGluZy1sZWZ0OiA1cHg7XG4gICAgcGFkZGluZy1yaWdodDogNXB4O1xufSIsImlvbi10ZXh0YXJlYSB7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/questions/text/text.component.ts":
/*!**************************************************!*\
  !*** ./src/app/questions/text/text.component.ts ***!
  \**************************************************/
/*! exports provided: TextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextComponent", function() { return TextComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var TextComponent = /** @class */ (function () {
    function TextComponent() {
        // call back for save changes
        this.saveProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.answer = '';
        // validation errors array
        this.errors = [];
        // propagate changes into the form control
        this.propagateChange = function (_) { };
    }
    TextComponent_1 = TextComponent;
    TextComponent.prototype.ngOnInit = function () {
        this._showSavedAnswers();
    };
    // fix IE/Edge text reversal issue
    TextComponent.prototype.onFocus = function (event) {
        var isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
        if (isIEOrEdge) {
            var textarea = event.target.firstChild;
            var existingText = textarea.value;
            if (textarea.value.length === 0) {
                textarea.value = 'a';
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                textarea.value = '';
            }
            else {
                textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                textarea.value = '';
                textarea.value = existingText;
            }
        }
    };
    // event fired when input/textarea value is changed. propagate the change up to the form control using the custom value accessor interface
    // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
    TextComponent.prototype.onChange = function (type) {
        if (type === void 0) { type = null; }
        // set changed value (answer or comment)
        if (type) {
            // initialise innerValue if not set
            if (!this.innerValue) {
                this.innerValue = {
                    answer: '',
                    comment: ''
                };
            }
            this.innerValue[type] = this[type];
        }
        else {
            this.innerValue = this.answer;
        }
        // propagate value into form control using control value accessor interface
        this.propagateChange(this.innerValue);
        this.saveProgress.emit(true);
        // 05/02/2019
        // Don't check "is required" error for now, it has some error.
        // Since we are checking required answer when submit, it's OK to just return here.
        return;
        // reset errors
        // this.errors = [];
        // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the answer area
        // for (const key in this.control.errors) {
        //   if (key === 'required') {
        //     this.errors.push('This question is required');
        //   } else {
        //     this.errors.push(this.control.errors[key]);
        //   }
        // }
    };
    // From ControlValueAccessor interface
    TextComponent.prototype.writeValue = function (value) {
        if (value) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    TextComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // From ControlValueAccessor interface
    TextComponent.prototype.registerOnTouched = function (fn) {
    };
    // adding save values to from control
    TextComponent.prototype._showSavedAnswers = function () {
        if ((this.reviewStatus === 'in progress') && (this.doReview)) {
            this.innerValue = {
                answer: [],
                comment: ''
            };
            this.innerValue.comment = this.review.comment;
            this.comment = this.review.comment;
            this.innerValue.answer = this.review.answer;
            this.answer = this.review.answer;
        }
        if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
            this.innerValue = this.submission.answer;
            this.answer = this.submission.answer;
        }
        this.propagateChange(this.innerValue);
        this.control.setValue(this.innerValue);
    };
    var TextComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "question", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "submission", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "review", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "reviewStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "submissionStatus", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TextComponent.prototype, "doAssessment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TextComponent.prototype, "doReview", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"])
    ], TextComponent.prototype, "control", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('answerEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TextComponent.prototype, "answerRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('commentEle'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], TextComponent.prototype, "commentRef", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TextComponent.prototype, "saveProgress", void 0);
    TextComponent = TextComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-text',
            template: __importDefault(__webpack_require__(/*! raw-loader!./text.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/questions/text/text.component.html")).default,
            providers: [
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
                    multi: true,
                    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return TextComponent_1; }),
                }
            ],
            styles: [__importDefault(__webpack_require__(/*! ./text.component.scss */ "./src/app/questions/text/text.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], TextComponent);
    return TextComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~assessment-assessment-module~events-events-module~reviews-reviews-module~tasks-tasks-module.js.map