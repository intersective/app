import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceMobileComponent } from './preference-mobile.component';

describe('PreferenceMobileComponent', () => {
  let component: PreferenceMobileComponent;
  let fixture: ComponentFixture<PreferenceMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
