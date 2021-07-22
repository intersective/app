import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleComponent } from './multiple.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { UtilsService } from '@services/utils.service';
import { TestUtils } from '@testing/utils';

describe('MultipleComponent', () => {
  let component: MultipleComponent;
  let fixture: ComponentFixture<MultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, ReactiveFormsModule ],
      declarations: [ MultipleComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing onInit()', () => {
    it('should get correct data for in progress submission', () => {
      component.question = {
        choices: [
          { id: 1, name: 'choice1' },
          { id: 2, name: 'choice2' }
        ],
        audience: []
      };
      component.submissionStatus = 'in progress';
      component.doAssessment = true;
      component.submission = {answer: 'abc'};
      component.reviewStatus = 'not started';
      component.doReview = false;
      component.review = {};
      component.control = new FormControl('');
      fixture.detectChanges();
      expect(component.innerValue).toEqual(component.submission.answer);
      expect(component.control.value).toEqual(component.submission.answer);
    });

    it('should get correct data for in progress review', () => {
      component.question = {
        choices: [
          { id: 1, name: 'choice1' },
          { id: 2, name: 'choice2' }
        ],
        audience: []
      };
      component.submissionStatus = 'pending review';
      component.doAssessment = false;
      component.submission = {answer: 'abc'};
      component.reviewStatus = 'in progress';
      component.doReview = true;
      component.review = {
        comment: 'asdf',
        answer: {name: 'abc'}
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
      component.control = new FormControl('');
      component.control.setErrors({});
    });
    it('should return error if there are invalidations', () => {
      component.control.setErrors({
        key: 'error'
      });
      component.onChange(4, null);
      expect(component.errors.length).toBe(1);
    });
    it('should return error if required not filled', () => {
      component.control.setErrors({
        required: true
      });
      component.onChange(4, null);
      expect(component.errors.length).toBe(1);
      expect(component.errors[0]).toContain('is required');
    });
    it('should get correct data when writing submission answer', () => {
      component.onChange(4, null);
      expect(component.errors.length).toBe(0);
      expect(component.innerValue).toEqual([4]);
    });
    it('should get correct data when writing submission answer', () => {
      component.innerValue = [1, 2, 3];
      component.onChange(4, null);
      expect(component.errors.length).toBe(0);
      expect(component.innerValue).toEqual([1, 2, 3, 4]);
    });
    it('should get correct data when writing review answer', () => {
      component.innerValue = JSON.stringify({answer: [1, 2, 3], comment: ''});
      component.onChange(2, 'answer');
      expect(component.errors.length).toBe(0);
      expect(component.innerValue).toEqual({answer: [1, 3], comment: ''});
    });
    it('should get correct data when writing review comment', () => {
      component.onChange('data', 'comment');
      expect(component.errors.length).toBe(0);
      expect(component.innerValue).toEqual({answer: [], comment: 'data'});
    });
  });

  it('when testing writeValue(), it should pass data correctly', () => {
    component.writeValue({data: 'data'});
    expect(component.innerValue).toEqual(JSON.stringify({data: 'data'}));
    component.writeValue(null);
  });
  it('when testing registerOnChange()', () => {
    component.registerOnChange(() => true);
    expect(component.propagateChange).toBeTruthy();
    component.registerOnTouched(() => true);
  });

});

