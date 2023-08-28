import { Component, Input, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-oneof',
  templateUrl: 'oneof.component.html',
  styleUrls: ['./oneof.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OneofComponent),
    }
  ]
})
export class OneofComponent implements ControlValueAccessor, OnInit {
  @Input() submitActions$: Subject<any>;

  @Input() question;
  @Input() submission;
  @Input() submissionId: number;
  @Input() review;
  @Input() reviewId: number;
  // this is for review status
  @Input() reviewStatus;
  // this is for assessment status
  @Input() submissionStatus;
  // this is for doing an assessment or not
  @Input() doAssessment: Boolean;
  // this is for doing review or not
  @Input() doReview: Boolean;
  // FormControl that is passed in from parent component
  @Input() control: AbstractControl;
  // answer field for submitter & reviewer
  @ViewChild('answerEle') answerRef: ElementRef;
  // comment field for reviewer
  @ViewChild('commentEle') commentRef: ElementRef;

  // the value of answer
  innerValue: any;
  comment: string;
  // validation errors array
  errors: Array<any> = [];

  autosave$ = new Subject<any>();

  constructor() {}

  ngOnInit() {
    this._showSavedAnswers();
  }

  ngAfterViewInit() {
    this.autosave$.pipe(
      debounceTime(800),
    ).subscribe(() => {
      const action: {
        autoSave?: boolean;
        goBack?: boolean;
        questionSave?: {};
        reviewSave?: {};
      } = {
        autoSave: true,
        goBack: false,
      };

      if (this.doReview === true) {
        action.reviewSave = {
          reviewId: this.reviewId,
          submissionId: this.submissionId,
          questionId: this.question.id,
          answer: this.innerValue.answer,
          comment: this.innerValue.comment,
        };
      }

      if (this.doAssessment === true) {
        action.questionSave = {
          submissionId: this.submissionId,
          questionId: this.question.id,
          answer: this.innerValue,
        };
      }

      this.submitActions$.next(action);
    });
  }

  // propagate changes into the form control
  propagateChange = (_: any) => {};

  // event fired when radio is selected. propagate the change up to the form control using the custom value accessor interface
  // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
  onChange(value, type?: string) {
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
    } else {
      this.innerValue = value;
    }

    // propagate value into form control using control value accessor interface
    this.propagateChange(this.innerValue);

    // reset errors
    this.errors = [];
    // setting, resetting error messages into an array (to loop) and adding the validation messages to show below the answer area
    for (const key in this.control.errors) {
      if (key === 'required') {
        this.errors.push('This question is required');
      } else {
        this.errors.push(this.control.errors[key]);
      }
    }

    this.autosave$.next();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {

  }

  // adding save values to from control
  private _showSavedAnswers() {
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
  }

  // check question audience have more that one audience and is it includes reviewer as audience.
  // then will identify it as a student and mentor answering in the same question and
  // border need to add only for mentor section not for full question
  audienceContainReviewer() {
    return this.question.audience.length > 1 && this.question.audience.includes('reviewer');
  }

  /**
   * This method checking is passed choice id is the selected answer.
   * innerValue is the question answer
   * @param choiceId question choice ID
   */
  checkInnerValue(choiceId) {
    if (!choiceId) {
      return;
    }
    if (choiceId === this.innerValue) {
      return true;
    }
  }

  get isDisplayOnly(): boolean {
    if (this.doReview === true && this.question?.canAnswer === false) {
      return true;
    }

    return !this.doAssessment && !this.doReview && (this.submissionStatus === 'feedback available' || this.submissionStatus === 'pending review' || (this.submissionStatus === 'done' && this.reviewStatus === ''));
  }
}
