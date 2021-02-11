import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceUpdateModalComponent } from './preference-update-modal.component';

describe('PreferenceUpdateModalComponent', () => {
  let component: PreferenceUpdateModalComponent;
  let fixture: ComponentFixture<PreferenceUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
