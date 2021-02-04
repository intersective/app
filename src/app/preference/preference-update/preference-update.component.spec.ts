import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { PreferenceService } from '../preference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { UtilsService } from '@services/utils.service';
import { PreferenceUpdateComponent } from './preference-update.component';

const bestKey = {
  'description': 'When I receive chat messages',
  'key': 'best key',
  'name': 'Chat messages',
  'options': [
    {
      'locked': false,
      'locked_name': '',
      'medium': 'email',
      'name': 'Email',
      'value': true
    },
    {
      'locked': false,
      'locked_name': '',
      'medium': 'sms',
      'name': 'SMS',
      'value': false
    }
  ],
  'remarks': 'Chat messages can be muted from within individual chat channels'
};
const new_member_added = {
  'description': 'How do you want to be told when a member was added to the team',
  'key': 'new_member_added',
  'name': 'When a member has been added to the team',
  'options': [
    {
      'locked': false,
      'locked_name': '',
      'medium': 'email',
      'name': 'Email',
      'value': true
    },
    {
      'locked': false,
      'locked_name': '',
      'medium': 'sms',
      'name': 'SMS',
      'value': false
    }
  ],
  'remarks': ''
};
const member_removed = {
  'description': 'How do you want to be told when a member was removed from the team',
  'key': 'member_removed',
  'name': 'When a member has been removed',
  'options': [
    {
      'locked': false,
      'locked_name': '',
      'medium': 'email',
      'name': 'Email',
      'value': true
    },
    {
      'locked': false,
      'locked_name': '',
      'medium': 'sms',
      'name': 'SMS',
      'value': false
    }
  ],
  'remarks': ''
};

const SAMPLE_PREFERENCE = {
  'categories': [
    {
      'name': 'Chat Notifications',
      'order': 1,
      'preferences': [
        bestKey
      ]
    },
    {
      'name': 'Team Changes Notifications',
      'order': 2,
      'preferences': [
        new_member_added,
        member_removed
      ]
    }
  ]
};

describe('PreferenceUpdateComponent', () => {
  let component: PreferenceUpdateComponent;
  let fixture: ComponentFixture<PreferenceUpdateComponent>;
  let routerSpy: Router;
  let utilSpy: UtilsService;
  let preferenceSpy: PreferenceService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferenceUpdateComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: PreferenceService,
          useValue: {
            'getPreference': () => true,
            'preference$': of(true),
            'update': jasmine.createSpy('PreferenceService.update').and.returnValue({
              toPromise: () => Promise.resolve(true)
            })
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                key: 'testURLParam'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', {
            navigate: true
          })
        },
        {
          provide: UtilsService,
          useValue: jasmine.createSpyObj('UtilsService', {
            isEmpty: false
          })
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    preferenceSpy = TestBed.inject(PreferenceService) as jasmine.SpyObj<PreferenceService>;
    utilSpy = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with empty currentPreference', () => {
    component.ngOnInit();
    expect(component.currentPreference).toEqual({
      name: '',
      description: '',
      options: '',
      remarks: '',
    });
  });

  describe('filterPreferences()', () => {
    it('should filter preferences', () => {
      const result = component.filterPreferences(SAMPLE_PREFERENCE, 'best key');
      console.log(result);
      expect(result).toEqual(bestKey);
    });
  });

  describe('updatePreference()', () => {
    it('should updatePreference', () => {
      const preferenceKey = 'best key';

      component.currentPreference = component.filterPreferences(SAMPLE_PREFERENCE, preferenceKey);
      expect(component.currentPreference).toEqual(bestKey);

      component.updatePreference({ medium: 'sms', checked: true });
      expect(component['newUpdates']).toEqual(jasmine.objectContaining({
        [preferenceKey]: {
          'sms': true
        }
      }));

      component.updatePreference({ medium: 'email', checked: true });
      expect(component['newUpdates']).toEqual(jasmine.objectContaining({
        [preferenceKey]: {
          'sms': true,
          'email': true
        }
      }));
    });
  });

  describe('back()', () => {
    it('should update preference if newUpdates isn\'t empty', fakeAsync(() => {
      component.back();

      flushMicrotasks();
      expect(preferenceSpy.update).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/preferences']);
    }));

    it('should not update preference if newUpdates empty', fakeAsync(() => {
      utilSpy.isEmpty = jasmine.createSpy().and.returnValue(true);
      component.back();

      flushMicrotasks();
      expect(preferenceSpy.update).not.toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/preferences']);
    }));
  });
});
