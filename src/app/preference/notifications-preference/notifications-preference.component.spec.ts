import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsPreferenceComponent } from './notifications-preference.component';

describe('NotificationsPreferenceComponent', () => {
  let component: NotificationsPreferenceComponent;
  let fixture: ComponentFixture<NotificationsPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
