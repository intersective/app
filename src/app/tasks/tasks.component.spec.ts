import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksComponent } from './tasks.component';
import { ActivityModule } from '../activity/activity.module';
import { TopicModule } from '../topic/topic.module';
import { AssessmentModule } from '../assessment/assessment.module';
import { Observable, of, pipe } from 'rxjs';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockRouter, NativeStorageServiceMock } from '@testing/mocked.service';
import { BrowserStorageService } from '@services/storage.service';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NativeStorageService } from '@services/native-storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { EmbedVideoService } from 'ngx-embed-video';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let routeSpy: ActivatedRoute;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorageService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TopicModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AssessmentModule
      ],
      declarations: [ TasksComponent ],
      providers: [
        Apollo,
        EmbedVideoService, // required by TopicModule
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 1 })
            }
          }
        },
        {
          provide: NativeStorageService,
          useClass: NativeStorageServiceMock
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['getUser', 'get'])
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    routeSpy = TestBed.inject(ActivatedRoute);
    nativeStorageSpy = TestBed.inject(NativeStorageService) as jasmine.SpyObj<NativeStorageService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    // mock the activity object
    component.activity = { onEnter() {} };
    // mock the topic object
    component.topic = { onEnter() {} };
    // mock the assessment object
    component.assessment = { onEnter() {} };

    fixture.detectChanges();
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
    let tasks;
    let expectedTopicId;
    let expectedAssessmentId;
    let expectedContextId;
    let params;
    beforeEach(() => {
      // mock the activity object
      component.activity = { onEnter() {} };
      // mock the topic object
      component.topic = { onEnter() {} };
      // mock the assessment object
      component.assessment = { onEnter() {} };

      // initialise the ids
      component.topicId = null;
      component.assessmentId = null;
      component.contextId = null;
      tasks = [{
        type: 'Topic',
        id: 2,
        status: ''
      }];
      expectedTopicId = null;
      expectedAssessmentId = null;
      expectedContextId = null;
      params = null;
      nativeStorageSpy.getObject.and.returnValue({
        teamId: null
      });
    });

    afterEach(fakeAsync(() => {
      flush();
      fixture.detectChanges();

      // do the test
      if (params) {
        routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => params[key]);
      }
      component.goToFirstTask(tasks);
      flush();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.topicId).toEqual(expectedTopicId);
        expect(component.assessmentId).toEqual(expectedAssessmentId);
        expect(component.contextId).toEqual(expectedContextId);
      });
    }));
    it('should not do anything if topicId exist already', () => {
      component.topicId = 1;
      expectedTopicId = 1;
    });

    it('should not do anything if assessmentId exist already', fakeAsync(() => {
      flush();

      component.assessmentId = 1;
      expectedAssessmentId = 1;
    }));

    it('should go to the topic if "tasks" parameter has value', fakeAsync(() => {
      let params1 = {
        id: 1,
        task: 'topic',
        task_id: 11
      };
      routeSpy.snapshot.paramMap.get = jasmine.createSpy().and.callFake(key => {
        return params1[key];
      });

      expectedTopicId = 11;
      flush();
    }));

    it('should go to the assessment if passed in as the parameter', () => {
      params = {
        id: 1,
        task: 'assessment',
        task_id: 11,
        context_id: 111
      };
      expectedAssessmentId = 11;
      expectedContextId = 111;
    });

    it('should go to the topic in the tasks if parameters passed in are not correct #1', fakeAsync(() => {
      flush();
      params = {
        id: 1,
        task: 'assessment'
      };
      expectedTopicId = 2;
    }));

    it('should go to the topic in the tasks if parameters passed in are not correct #2', () => {
      params = {
        id: 1,
        task: 'assessment',
        task_id: 11
      };
      expectedTopicId = 2;
    });
    it('should go to the topic in the tasks if parameters passed in are not correct #3', () => {
      params = {
        id: 1,
        task: 'other',
        task_id: 11
      };
      expectedTopicId = 2;
    });
    it('should go to the second task(first unfinished) in the tasks', () => {
      tasks = [
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
    it('should go to the first task(all finished or locked) in the tasks', () => {
      tasks = [
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
      nativeStorageSpy.getObject.and.returnValue({ teamId: null });
      expectedAssessmentId = 2;
      expectedContextId = 22;
    });
    it('should go to the team assessment(not finished) in the tasks', () => {
      tasks = [
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
      nativeStorageSpy.getObject.and.returnValue({ teamId: 1 });
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
