import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { ActivityModule } from '../activity/activity.module';
import { TopicModule } from '../topic/topic.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { Observable, of, pipe } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '@testing/activated-route-stub';
import { MockRouter } from '@testing/mocked.service';
import { BrowserStorageService } from '@services/storage.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let routeStub: ActivatedRouteStub;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ActivityModule, TopicModule, AssessmentModule ],
      declarations: [ EventsComponent ],
      providers: [
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub({ id: 1 })
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['getUser'])
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    routeStub = TestBed.get(ActivatedRoute);
    storageSpy = TestBed.get(BrowserStorageService);
    // mock the activity object
    component.activity = { onEnter() {} };
    // mock the topic object
    component.topic = { onEnter() {} };
    // mock the assessment object
    component.assessment = { onEnter() {} };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct activity id', fakeAsync(() => {
    // spy on the onEnter function
    spyOn(component.activity, 'onEnter');
    component.onEnter();
    expect(component.activityId).toEqual(1);
    expect(component.topicId).toBeNull();
    expect(component.assessmentId).toBeNull();
    tick();
    expect(component.activity.onEnter).toHaveBeenCalled();
  }));

  describe('when testing goToFirstTask()', () => {
    let events;
    let expectedTopicId;
    let expectedAssessmentId;
    let expectedContextId;
    beforeEach(() => {
      // initialise the ids
      component.topicId = null;
      component.assessmentId = null;
      component.contextId = null;
      events = [{
        type: 'Topic',
        id: 2,
        status: ''
      }];
      expectedTopicId = null;
      expectedAssessmentId = null;
      expectedContextId = null;
    });
    afterEach(() => {
      // do the test
      component.goToFirstTask(events);
      expect(component.topicId).toEqual(expectedTopicId);
      expect(component.assessmentId).toEqual(expectedAssessmentId);
      expect(component.contextId).toEqual(expectedContextId);
    });
    it('should not do anything if topicId exist already', () => {
      component.topicId = 1;
      expectedTopicId = 1;
    });
    it('should not do anything if assessmentId exist already', () => {
      component.assessmentId = 1;
      expectedAssessmentId = 1;
    });
    it('should go to the topic if passed in as the parameter', () => {
      routeStub.setParamMap({
        id: 1,
        task: 'topic',
        task_id: 11
      });
      expectedTopicId = 11;
    });
    it('should go to the assessment if passed in as the parameter', () => {
      routeStub.setParamMap({
        id: 1,
        task: 'assessment',
        task_id: 11,
        context_id: 111
      });
      expectedAssessmentId = 11;
      expectedContextId = 111;
    });
    it('should go to the topic in the events if parameters passed in are not correct #1', () => {
      routeStub.setParamMap({
        id: 1,
        task: 'assessment'
      });
      expectedTopicId = 2;
    });
    it('should go to the topic in the events if parameters passed in are not correct #2', () => {
      routeStub.setParamMap({
        id: 1,
        task: 'assessment',
        task_id: 11
      });
      expectedTopicId = 2;
    });
    it('should go to the topic in the events if parameters passed in are not correct #3', () => {
      routeStub.setParamMap({
        id: 1,
        task: 'other',
        task_id: 11
      });
      expectedTopicId = 2;
    });
    it('should go to the second task(first unfinished) in the events', () => {
      events = [
        {
          type: 'Topic',
          id: 2,
          status: 'done'
        },
        {
          type: 'Topic',
          id: 3,
          status: ''
        },
        {
          type: 'Topic',
          id: 4,
          status: ''
        }
      ];
      expectedTopicId = 3;
    });
    it('should go to the first task(all finished or locked) in the events', () => {
      events = [
        {
          type: 'Assessment',
          id: 2,
          status: 'done',
          contextId: 22
        },
        {
          type: 'Locked',
          id: 3,
          status: ''
        },
        {
          type: 'Assessment',
          id: 4,
          isForTeam: true,
          status: ''
        }
      ];
      storageSpy.getUser.and.returnValue({ teamId: null });
      expectedAssessmentId = 2;
      expectedContextId = 22;
    });
    it('should go to the team assessment(not finished) in the events', () => {
      events = [
        {
          type: 'Assessment',
          id: 1,
          status: '',
          isLocked: true
        },
        {
          type: 'Assessment',
          id: 2,
          status: 'done',
          contextId: 22
        },
        {
          type: 'Locked',
          id: 3,
          status: ''
        },
        {
          type: 'Assessment',
          id: 4,
          isForTeam: true,
          status: '',
          contextId: 44
        }
      ];
      storageSpy.getUser.and.returnValue({ teamId: 1 });
      expectedAssessmentId = 4;
      expectedContextId = 44;
    });
  });

  describe('when testing currentTask()', () => {
    it('should return topic', () => {
      component.topicId = 1;
      component.assessmentId = 2;
      expect(component.currentTask()).toEqual({
        id: 1,
        type: 'Topic'
      });
    });
    it('should return assessment', () => {
      component.topicId = null;
      component.assessmentId = 2;
      expect(component.currentTask()).toEqual({
        id: 2,
        type: 'Assessment'
      });
    });
    it('should return null', () => {
      component.topicId = null;
      component.assessmentId = null;
      expect(component.currentTask()).toBeNull();
    });
  });
});
