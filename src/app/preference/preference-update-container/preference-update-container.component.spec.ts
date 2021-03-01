import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceUpdateContainerComponent } from './preference-update-container.component';

describe('PreferenceUpdateContainerComponent', () => {
  let component: PreferenceUpdateContainerComponent;
  let fixture: ComponentFixture<PreferenceUpdateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceUpdateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceUpdateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
