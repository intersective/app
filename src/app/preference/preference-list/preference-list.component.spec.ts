import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PreferenceService } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '@services/utils.service';
import { PreferenceListComponent } from './preference-list.component';
import { NotificationService } from '@shared/notification/notification.service';


describe('PreferenceListComponent', () => {
  let component: PreferenceListComponent;
  let fixture: ComponentFixture<PreferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: PreferenceService,
          useValue: {
            getPreference: () => true
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(true)
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => true
          }
        },
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', ['isMobile'])
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
