import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { ActivityService } from './activity.service';
import { of, throwError } from 'rxjs';
import { RequestService } from 'request';
import { UtilsService } from '@v3/services/utils.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { Router } from '@angular/router';
import { MockRouter } from '@testingv3/mocked.service';
import { TestUtils } from '@testingv3/utils';
import { ApolloService } from './apollo.service';
import { AssessmentService } from './assessment.service';
import { TopicService } from './topic.service';

describe('ActivityService', () => {
  let service: ActivityService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let apolloSpy: jasmine.SpyObj<ApolloService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let notificationSpy: jasmine.SpyObj<NotificationsService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let utils: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ActivityService,
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', [
            'get',
            'post',
          ])
        },
        {
          provide: NotificationsService,
          useValue: jasmine.createSpyObj('NotificationsService', ['activityCompletePopUp'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['getUser', 'getReferrer'])
        },
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: ApolloService,
          useValue: jasmine.createSpyObj('ApolloService', {
            'stop': of(),
            'graphQLWatch': of(),
            'graphQLFetch': of (),
          }),
        },
        {
          provide: TopicService,
          useValue: jasmine.createSpyObj('TopicService', ['']),
        },
        {
          provide: AssessmentService,
          useValue: jasmine.createSpyObj('AssessmentService', ['']),
        },
      ]
    });
    service = TestBed.inject(ActivityService);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    apolloSpy = TestBed.inject(ApolloService) as jasmine.SpyObj<ApolloService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    notificationSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    utils = TestBed.inject(UtilsService) as jasmine.SpyObj<UtilsService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when testing getActivity(), should get the correct data', () => {
    const requestResponse = {
      data: {
        activity: {
          id: 1,
          name: 'activity',
          description: 'des',
          tasks: [
            {
              id: 1,
              type: 'topic',
              name: 'topic 1',
              isLocked: true
            },
            {
              id: 11,
              type: 'topic',
              name: 'topic 2',
              isLocked: false,
              status: {
                status: 'done'
              }
            },
            {
              id: 21,
              type: 'assessment',
              name: 'asmt 21',
              isTeam: false,
              isLocked: false,
              deadline: '2019-02-02',
              contextId: 211,
              assessmentType: 'moderated',
              status: {
                status: 'in progress',
                isLocked: false,
                submitterName: 'sub name',
                submitterImage: 'sub image'
              }
            },
            {
              id: 22,
              type: 'assessment',
              name: 'asmt 22',
              isTeam: false,
              isLocked: false,
              deadline: '2039-02-02',
              contextId: 211,
              assessmentType: 'team360',
              status: {
                status: 'pending approval',
                isLocked: false,
                submitterName: 'sub name',
                submitterImage: 'sub image'
              }
            }
          ]
        }
      }
    };
    const activity = requestResponse.data.activity;
    const topic1 = JSON.parse(JSON.stringify(activity.tasks[0]));
    const topic2 = JSON.parse(JSON.stringify(activity.tasks[1]));
    const assessment1 = JSON.parse(JSON.stringify(activity.tasks[2]));
    const assessment2 = JSON.parse(JSON.stringify(activity.tasks[3]));
    const expected = {
      id: activity.id,
      name: activity.name,
      description: activity.description,
      tasks: [
        {
          id: 0,
          type: 'Locked',
          name: 'Locked'
        },
        {
          id: topic2.id,
          type: 'Topic',
          name: topic2.name,
          status: topic2.status.status
        },
        {
          id: assessment1.id,
          type: 'Assessment',
          name: assessment1.name,
          contextId: 211,
          isForTeam: assessment1.isTeam,
          dueDate: assessment1.deadline,
          isOverdue: true,
          isDueToday: false,
          status: assessment1.status.status,
          isLocked: assessment1.status.isLocked,
          submitter: {
            name: assessment1.status.submitterName,
            image: assessment1.status.submitterImage
          },
          assessmentType: assessment1.assessmentType
        },
        {
          id: assessment2.id,
          type: 'Assessment',
          name: assessment2.name,
          contextId: assessment2.contextId,
          isForTeam: assessment2.isTeam,
          dueDate: assessment2.deadline,
          isOverdue: false,
          isDueToday: false,
          status: 'pending review',
          isLocked: assessment2.status.isLocked,
          submitter: {
            name: assessment2.status.submitterName,
            image: assessment2.status.submitterImage
          },
          assessmentType: assessment2.assessmentType
        }
      ]
    };
    apolloSpy.graphQLFetch.and.returnValue(of(requestResponse));
    service.getActivity(1);
    service.activity$.subscribe(res => expect(res).toEqual(expected));
  });

  /* xdescribe('getNextTask()', () => {
    it('should return in format: { is_last, task }', () => {
      const data = {
        is_last: true,
        task: null
      };
      const expected = {
        isLast: true,
        task: null,
      };

      requestSpy.get.and.returnValue(of({
        data
      }));

      service.getNextTask(1, '', 1).subscribe(res => {
        expect(res).toEqual(expected);
      }, err => {
        expect(err).toBeFalsy();
      });
    });
  });

  xdescribe('when testing goToNextTask()', () => {
    it('should go to home page', fakeAsync(() => {
      requestSpy.get.and.returnValue(of({
        data: {
          is_last: true,
          task: null
        }
      }));
      service.goToNextTask(1, 2);
      tick();
      expect(routerSpy.navigate.calls.first().args[0]).toEqual(['v3', 'home']);
      expect(routerSpy.navigate.calls.first().args[1]).toEqual({
        queryParams: {
          activityId: 1,
          activityCompleted: true,
        }
      });
    }));

    it('should go to external url', fakeAsync(() => {
      requestSpy.get.and.returnValue(of({
        data: {
          is_last: true,
          task: null
        }
      }));
      storageSpy.getReferrer.and.returnValue({
        activityTaskUrl: 'abc',
      });
      service.goToNextTask(1, 2);
      tick();
      expect(utils.redirectToUrl).toHaveBeenCalled();
    }));

    it('should pop up modal', fakeAsync(() => {
      requestSpy.get.and.returnValue(of({
        data: {
          is_last: true,
          task: {
            id: 11,
            name: 'assessment1',
            type: 'assessment',
            context_id: 12
          }
        }
      }));
      service.goToNextTask(1, 2);
      tick();
      expect(notificationSpy.activityCompletePopUp.calls.count()).toBe(1);
    }));

    it('should go to assessment page', fakeAsync(() => {
      requestSpy.get.and.returnValue(of({
        data: {
          is_last: false,
          task: {
            id: 11,
            name: 'assessment1',
            type: 'assessment',
            context_id: 12
          }
        }
      }));
      service.goToNextTask(1, 2).then(res => expect(res).toEqual(['assessment', 'assessment', '1', '12', '11']));
    }));
    it('should go to topic page', fakeAsync(() => {
      requestSpy.get.and.returnValue(of({
        data: {
          is_last: false,
          task: {
            id: 11,
            name: 'topic1',
            type: 'topic'
          }
        }
      }));
      service.goToNextTask(1, 2).then(res => {
        expect(res).toEqual(['topic', '1', '11']);
      });
    }));
  }); */
});
