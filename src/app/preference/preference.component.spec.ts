import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceComponent } from './preference.component';
import { UtilsService } from '@services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceComponent ],
      providers: [
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', ['isMobile'])
        },
        {
          provide: Router,
          useValue: {
            navigate: () => true
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
