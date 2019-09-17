import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { Observable, of, pipe } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { UtilsService } from '@services/utils.service';
import { HomeService } from '../home/home.service';
import { ActivatedRouteStub } from '@testing/activated-route-stub';
import { TestUtils } from '@testing/utils';
import { HttpClientModule } from '@angular/common/http';
import { FastFeedbackService } from '../fast-feedback/fast-feedback.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

class Page {
  get programName() {
    return this.query<HTMLElement>('ion-title');
  }
  get topBubbles() {
    return this.queryAll<HTMLElement>('bubbles-top');
  }
  get milestones() {
    return this.queryAll<HTMLElement>('project-item');
  }
  fixture: ComponentFixture<ProjectComponent>;

  constructor(fixture: ComponentFixture<ProjectComponent>) {
    this.fixture = fixture;
  }
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

fdescribe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let page: Page;
  let projectSpy: jasmine.SpyObj<ProjectService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeStub: ActivatedRouteStub;
  let utils: UtilsService;
  let homeSpy: jasmine.SpyObj<HomeService>;
  let fastfeedbackSpy: jasmine.SpyObj<FastFeedbackService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [ ProjectComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        UtilsService,
        {
          provide: ElementRef,
          useClass: MockElementRef
        },
        {
          provide: ProjectService,
          useValue: jasmine.createSpyObj('ProjectService', ['getMilestones', 'getActivities', 'getProgress'])
        },
        {
          provide: HomeService,
          useValue: jasmine.createSpyObj('HomeService', ['getProgramName'])
        },
        {
          provide: FastFeedbackService,
          useValue: jasmine.createSpyObj('FastFeedbackService', ['pullFastFeedback'])
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
            events: of()
          }
        },
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({ activityId: 1 })
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    projectSpy = TestBed.get(ProjectService);
    routerSpy = TestBed.get(Router);
    routeStub = TestBed.get(ActivatedRoute);
    utils = TestBed.get(UtilsService);
    homeSpy = TestBed.get(HomeService);
    fastfeedbackSpy = TestBed.get(FastFeedbackService);
    homeSpy.getProgramName.and.returnValue(of('program name'));
    fastfeedbackSpy.pullFastFeedback.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when testing onEnter()', () => {
    it('should get correct data', () => {
      const milestones = Array.from({length: 5}, (x, i) => {
        return {
          id: i + 1,
          name: 'm' + i,
          description: 'des' + i,
          isLocked: false,
          progress: 0,
          Activity: []
        };
      });
      const activities = Array.from({length: 5}, (x, i) => {
        return Array.from({length: 3}, (y, j) => {
          return {
            id: i * 10 + j + 1,
            name: 'activity name' + j,
            milestoneId: i + 1,
            isLocked: false,
            leadImage: '',
            progress: 0,
          };
        });
      });
      const progresses = {
        Milestone: Array.from({length: 5}, (x, i) => {
          return {
            id: i + 1,
            progress: (i + 1) / 10,
            Activity: Array.from({length: 3}, (y, j) => {
              return {
                id: i * 10 + j + 1,
                progress: (i * 10 + j + 1) / 100
              };
            })
          };
        })
      };
      const expected = milestones.map((milestone, i) => {
        milestone.Activity = activities[i].map((activity, j) => {
          activity.progress = (i * 10 + j + 1) / 100;
          return activity;
        });
        milestone.progress = (i + 1) / 10;
        return milestone;
      });
      projectSpy.getMilestones.and.returnValue(of(milestones));
      projectSpy.getActivities.and.returnValue(of(utils.flatten(activities)));
      projectSpy.getProgress.and.returnValue(of(progresses));
      fixture.detectChanges();
      expect(component.loadingMilestone).toBe(false);
      expect(component.loadingActivity).toBe(false);
      expect(component.loadingProgress).toBe(false);
      expect(component.milestones).toEqual(expected);
      expect(fastfeedbackSpy.pullFastFeedback.calls.count()).toBe(1);
    });
  });

});

