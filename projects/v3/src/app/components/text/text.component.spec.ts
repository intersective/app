import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TextComponent } from './text.component';
import { FormControl, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FormsModule],
      declarations: [TextComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    component.answer = new FormControl('');
    component.comment = new FormControl('');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing onInit()', () => {
    const dummyQuestion = {
      id: 1,
      name: '',
      type: '',
      description: '',
      isRequired: true,
      canComment: false,
      canAnswer: true,
      choices: [
        {
          id: 1,
          name: 'choice1',
        },
        {
          id: 2,
          name: 'choice2'
        },
      ],
      audience: []
    };
    it('should get correct data for in progress submission', () => {
      component.question = dummyQuestion;
      component.submissionStatus = 'in progress';
      component.doAssessment = true;
      component.submission = { answer: 'abc' };
      component.reviewStatus = 'not started';
      component.doReview = false;
      component.review = {};
      component.control = new FormControl('');
      fixture.detectChanges();
      expect(component.innerValue).toEqual(component.submission.answer);
      expect(component.control.value).toEqual(component.submission.answer);
    });

    it('should get correct data for in progress review', () => {
      component.question = dummyQuestion;
      component.submissionStatus = 'pending review';
      component.doAssessment = false;
      component.submission = { answer: 'abc' };
      component.reviewStatus = 'in progress';
      component.doReview = true;
      component.review = {
        comment: 'asdf',
        answer: { name: 'abc' }
      };
      component.control = new FormControl('');
      fixture.detectChanges();
      expect(component.innerValue).toEqual(component.review);
      expect(component.comment).toEqual(component.review.comment);
      expect(component.control.value).toEqual(component.review);
    });
  });

  describe('when testing onChange()', () => {
    beforeEach(() => {
      component.answer.setValue('answer');
      component.comment.setValue('comment');
    });
    it('should get correct data when writing submission answer', () => {
      component.onChange();
      expect(component.innerValue).toEqual(component.answer);
    });
    it('should get correct data when writing review answer', () => {
      component.innerValue = { answer: '', comment: '' };
      component.onChange('answer');
      expect(component.innerValue).toEqual({ answer: component.answer, comment: '' });
    });
    it('should get correct data when writing review comment', () => {
      component.onChange('comment');
      expect(component.innerValue).toEqual({ answer: '', comment: component.comment });
    });
  });

  it('when testing writeValue(), it should pass data correctly', () => {
    component.writeValue({ data: 'data' });
    expect(component.innerValue).toEqual({ data: 'data' });
    component.writeValue(null);
  });
  it('when testing registerOnChange()', () => {
    component.registerOnChange(() => true);
    expect(component.propagateChange).toBeTruthy();
    component.registerOnTouched(() => true);
  });

});

