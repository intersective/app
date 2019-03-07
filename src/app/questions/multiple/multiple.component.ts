import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-multiple',
  templateUrl: 'multiple.component.html',
  styleUrls: ['multiple.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MultipleComponent),
    }
  ]
})
export class MultipleComponent implements ControlValueAccessor, AfterViewInit {

  @Input() question;
  @Input() submission;
  @Input() review;
  // this is for review status
  @Input() reviewStatus;
  // this is for assessment status
  @Input() submissionStatus;
  // this is for doing an assessment or not
  @Input() doAssessment: Boolean;
  // this is for doing review or not
  @Input() doReview: Boolean;
  // FormControl that is passed in from parent component
  @Input() control: FormControl;
  // answer field for submitter & reviewer
  @ViewChild('answer') answerRef: ElementRef;
  // comment field for reviewer
  @ViewChild('commentEle') commentRef: ElementRef;
  // call back for save changes
  @Output() saveProgress = new EventEmitter<boolean>();

  // the value of answer
  innerValue: any;
  comment: string;
  // validation errors array
  errors: Array<any> = [];

  constructor(
    private utils: UtilsService
  ) {}

  ngAfterViewInit() {
    this._showSavedAnswers();
  }

  // propagate changes into the form control
  propagateChange = (_: any) => {};

  // event fired when checkbox is selected/unselected. propagate the change up to the form control using the custom value accessor interface
  // if 'type' is set, it means it comes from reviewer doing review, otherwise it comes from submitter doing assessment
  onChange(value, type) {
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
      } else {
        this.innerValue.answer = this.utils.addOrRemove(this.innerValue.answer, value);
      }
    } else {
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
    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key)) {
        if (key === 'required') {
          this.errors.push('This question is required');
        } else {
          this.errors.push(this.control.errors[key]);
        }
      }
    }
    this.saveProgress.emit(true);
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value) {
      this.innerValue = JSON.stringify(value);
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
      if (this.review.comment) {
        if (!this.innerValue) {
          this.innerValue = {
            answer: [],
            comment: ''
          };
        }
        this.innerValue.comment = this.review.comment;
        this.comment = this.review.comment;
      }
      if (this.review.answer) {
        if (!this.innerValue) {
          this.innerValue = {
            answer: [],
            comment: ''
          };
        }
        this.innerValue.answer = this.utils.addOrRemove(this.innerValue.answer, this.review.answer);
      }
    }
    if ((this.submissionStatus === 'in progress') && (this.doAssessment)) {
      if (!this.innerValue) {
        this.innerValue = [];
      }
      this.innerValue = this.utils.addOrRemove(this.innerValue, this.submission.answer);
    }
    this.propagateChange(this.innerValue);
  }

}
