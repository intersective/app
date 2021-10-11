import { HttpClient } from '@angular/common/http';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NewRelicService } from '@app/shared/new-relic/new-relic.service';
import { NotificationService } from '@app/shared/notification/notification.service';
import { RequestService } from '@app/shared/request/request.service';
import { TopicService } from '@app/topic/topic.service';
import { BrowserStorageServiceMock } from '@testing/mocked.service';
import { TestUtils } from '@testing/utils';
import { Observable, of } from 'rxjs';
import { SharedService } from './shared.service';
import { BrowserStorageService } from './storage.service';
import { UtilsService } from './utils.service';
import { ApolloService } from '@shared/apollo/apollo.service';
import { PusherService } from '@shared/pusher/pusher.service';

describe('SharedService', () => {
  let service: SharedService;
  let httpSpy: HttpClient;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let storageSpy: BrowserStorageService;
  let utilsSpy: UtilsService;
  let pusherServiceSpy: PusherService;
  let apolloServiceSpy: ApolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedService,
        {
          provide: PusherService,
          useValue: jasmine.createSpyObj('PusherService', ['initialise']),
        },
        {
          provide: ApolloService,
          useValue: jasmine.createSpyObj('ApolloService', ['initiateCoreClient', 'initiateChatClient']),
        },
        {
          provide: UtilsService,
          useClass: TestUtils
        },
        {
          provide: BrowserStorageService,
          useClass: BrowserStorageServiceMock,
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['achievementPopUp']),
        },
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj('HttpClient', {
            get: of(true),
          }),
        },
        {
          provide: NewRelicService,
          useValue: jasmine.createSpyObj('NewRelicService', ['noticeError']),
        },
        {
          provide: TopicService,
          useValue: jasmine.createSpyObj('TopicService', {
            updateTopicProgress: of({
              meta: {
                Achievement: {}
              }
            })
          }),
        },
        {
          provide: PusherService,
          useValue: jasmine.createSpyObj('PusherService', ['initialise']),
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', [
            'post',
            'graphQLWatch',
            'apiResponseFormatError',
            'graphQLFetch',
          ])
        },
      ]
    });
    service = TestBed.inject(SharedService);
    httpSpy = TestBed.inject(HttpClient);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    storageSpy = TestBed.inject(BrowserStorageService);
    utilsSpy = TestBed.inject(UtilsService);
    pusherServiceSpy = TestBed.inject(PusherService);
    apolloServiceSpy = TestBed.inject(ApolloService);
  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });


  describe('getTeamInfo()', () => {
    it('should make GraphQL API request to retrieve team info', () => {
      requestSpy.graphQLFetch.and.returnValue(of({
        data: {
          teams: [
            {
              id: 1,
              uuid: 'f310125a-2a7c-11ec-8d3d-0242ac130003',
              name: 'Team 1',
            },
            {
              id: 2,
              uuid: '13b937b6-2a7d-11ec-8d3d-0242ac130003',
              name: 'Team 2',
            },
            {
              id: 3,
              uuid: '184f5b5c-2a7c-11ec-8d3d-0242ac130003',
              name: 'Team 3',
            },
          ]
        }
      }));

      service.getTeamInfo().subscribe();
      expect(requestSpy.graphQLFetch).toHaveBeenCalled();
    });

    it('should set teamId as null when no teams retrieved from API', () => {
      requestSpy.graphQLFetch.and.returnValue(of({
        data: {
          teams: []
        }
      }));
      utilsSpy.has = jasmine.createSpy('has').and.returnValue(false);

      service.getTeamInfo().subscribe();
      expect(requestSpy.graphQLFetch).toHaveBeenCalled();
      expect(storageSpy.setUser).toHaveBeenCalledWith({
        teamId: null
      });
    });
  });

  describe('onPageLoad()', () => {
    it('should return void if timelineId undefined', () => {
      storageSpy.getUser = jasmine.createSpy('storageSpy.getUser').and.returnValue({
        timelineId: undefined,
      });
      const result = service.onPageLoad();
      expect(httpSpy.get).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should able to change color', () => {
      storageSpy.getUser = jasmine.createSpy('storageSpy.getUser').and.returnValue({
        timelineId: 1,
        colors: {
          theme: '#000000',
        },
        activityCardImage: 'abc'
      });
      const result = service.onPageLoad();
      expect(httpSpy.get).toHaveBeenCalled();
      expect(utilsSpy.changeThemeColor).toHaveBeenCalled();
      expect(utilsSpy.changeCardBackgroundImage).toHaveBeenCalled();
    });
  });

  describe('initWebServices()', () => {
    it('should init web services', fakeAsync(() => {
      storageSpy.stackConfig = {
        uuid: '002',
        name: 'Practera App - Local Development',
        description: 'Participate in an experience as a learner or reviewer - Local',
        image: 'https://media.intersective.com/img/learners_reviewers.png',
        url: 'http://127.0.0.1:4200/',
        type: 'app',
        coreApi: 'http://127.0.0.1:8080',
        coreGraphQLApi: 'http://127.0.0.1:8000',
        chatApi: 'http://localhost:3000/local/graphql',
        filestack: {
          s3Config: {
            container: 'practera-aus',
            region: 'ap-southeast-2'
          },
        },
        defaultCountryModel: 'AUS',
        lastLogin: 1619660600368
      };
      service.initWebServices();
      tick();
      expect(pusherServiceSpy.initialise).toHaveBeenCalled();
      expect(apolloServiceSpy.initiateCoreClient).toHaveBeenCalled();
      expect(apolloServiceSpy.initiateChatClient).toHaveBeenCalled();
    }));

    it('should not init web services if no stack info in stroage', fakeAsync(() => {
      storageSpy.stackConfig = null;
      service.initWebServices();
      tick();
      expect(pusherServiceSpy.initialise).not.toHaveBeenCalled();
      expect(apolloServiceSpy.initiateCoreClient).not.toHaveBeenCalled();
      expect(apolloServiceSpy.initiateChatClient).not.toHaveBeenCalled();
    }));
  });

});
