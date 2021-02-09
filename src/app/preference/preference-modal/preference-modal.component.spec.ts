import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceModalComponent } from './preference-modal.component';

describe('PreferenceModalComponent', () => {
  let component: PreferenceModalComponent;
  let fixture: ComponentFixture<PreferenceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
