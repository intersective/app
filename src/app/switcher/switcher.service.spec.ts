import { async, ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks, flush } from '@angular/core/testing';
import { SwitcherService } from './switcher.service';
import { of, Observable, pipe } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { SharedService } from '@services/shared.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UtilsService } from '@services/utils.service';
import { NotificationService } from '@shared/notification/notification.service';
import { TestUtils } from '@testing/utils';
import { BrowserStorageServiceMock, NativeStorageServiceMock} from '@testing/mocked.service';
import { BrowserStorageService } from '@services/storage.service';
import { NativeStorageService } from '@services/native-storage.service';
import { EventListService } from '@app/event-list/event-list.service';
import { ReviewListService } from '@app/review-list/review-list.service';
import { environment } from '@environments/environment';
import { ProgramFixture } from '@testing/fixtures/programs';
import { PusherService } from '@shared/pusher/pusher.service';
import { Apollo } from 'apollo-angular';

describe('SwitcherService', () => {
  let service: SwitcherService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  let nativeStorageSpy: jasmine.SpyObj<NativeStorageService>;
  let eventSpy: jasmine.SpyObj<EventListService>;
  let reviewSpy: jasmine.SpyObj<ReviewListService>;
  let pusherSpy: jasmine.SpyObj<PusherService>;
  let sharedSpy: jasmine.SpyObj<SharedService>;
  let utils: UtilsService;
  const testUtils = new TestUtils();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        Apollo,
        SwitcherService,
        UtilsService,
        EventListService,
        ReviewListService,
        PusherService,
        {
          provide: BrowserStorageService,
          useClass: BrowserStorageServiceMock
        },
        {
          provide: NativeStorageService,
          useClass: NativeStorageServiceMock
        },
        // SharedService,
        {
          provide: SharedService,
          useValue: jasmine.createSpyObj('SharedService', {
            onPageLoad: Promise.resolve(true)
          }),
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['post', 'graphQLQuery', 'apiResponseFormatError'])
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['modal'])
        },
      ]
    });
    service = TestBed.inject(SwitcherService);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    utils = TestBed.inject(UtilsService);
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
    nativeStorageSpy = TestBed.inject(NativeStorageService) as jasmine.SpyObj<NativeStorageService>;
    eventSpy = TestBed.inject(EventListService) as jasmine.SpyObj<EventListService>;
    reviewSpy = TestBed.inject(ReviewListService) as jasmine.SpyObj<ReviewListService>;
    pusherSpy = TestBed.inject(PusherService) as jasmine.SpyObj<PusherService>;
    sharedSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;

    requestSpy.get = jasmine.createSpy('get').and.returnValue(new Observable());
  });

  it('should be created', () => {
      expect(service).toBeTruthy();
  });

  describe('getPrograms()', () => {
    it('should get program list from storage/cache', fakeAsync(() => {
      nativeStorageSpy.getObject.and.returnValue([
        {program: {}, timeline: {}, project: {lead_image: 'https://www.filepicker.io/api/file/DAsMaIUcQcSM3IFqalPN'}, enrolment: {}}
      ]);
      tick();

      service.getPrograms().then(res => {
        res.subscribe(programs => {
          expect(programs[0].project.lead_image).toContain('https://cdn.filestackcontent.com/resize=fit:crop,width:');
        });
      });

      flushMicrotasks();
      expect(nativeStorageSpy.getObject).toHaveBeenCalledWith('programs');
    }));
  });

  describe('when testing checkIsOneProgram()', () => {
    it('should return true if got Array with one program object ', async () => {
        spyOn(utils, 'isEmpty').and.returnValue(false);
        expect(await service.checkIsOneProgram([{}])).toBe(true);
    });
    it('should return false if got Array multiple program objects ', async () => {
        spyOn(utils, 'isEmpty').and.returnValue(false);
        expect(await service.checkIsOneProgram([{}, {}, {}])).toBe(false);
    });
  });

  describe('when testing switchProgramAndNavigate()', () => {
    beforeEach(() => {
      spyOn(pusherSpy, 'initialise');
      spyOn(utils, 'clearCache');
      // by default test normal flow (non-direct link)
      storageSpy.get = jasmine.createSpy('get').and.returnValue(false);
    });

    it('should return undefined if got empty object ', fakeAsync(() => {
      let result;
      spyOn(utils, 'isEmpty').and.returnValue(true);
      service.switchProgramAndNavigate({}).then(data => {
        result = data;
      });
      flushMicrotasks();
      expect(result).toBeUndefined();
    }));

    it('should return [switcher] if programs is Array with multiple program objects ', fakeAsync(() => {
        let result;
        spyOn(service, 'checkIsOneProgram').and.returnValue(false);
        spyOn(Array, 'isArray').and.returnValue(true);
        service.switchProgramAndNavigate(ProgramFixture).then(data => {
          result = data;
        });
        flushMicrotasks();
        expect(result).toEqual(['switcher', 'switcher-program']);
    }));

    it('should return [app, home] if programs is Array with multiple program objects ', fakeAsync(() => {
      const [firstProgram] = ProgramFixture;
      spyOn(service, 'checkIsOneProgram').and.returnValue(true);
      spyOn(Array, 'isArray').and.returnValue(true);
      spyOn(service, 'switchProgram').and.returnValue({
          toPromise: () => new Promise(res => res(true))
        });

      let result;
      service.switchProgramAndNavigate([firstProgram]).then(data => {
          result = data;
        });
      flushMicrotasks();
      expect(result).toEqual(['app', 'home']);
      expect(pusherSpy.initialise).toHaveBeenCalled();
    }));

    it('should return [app, home] if programs is not an Array and got one program object (direct link)', fakeAsync(() => {
        spyOn(utils, 'isEmpty').and.returnValue(false);
        spyOn(Array, 'isArray').and.returnValue(false);
        spyOn(service, 'switchProgram').and.returnValue(of({}));

        // simulate direct-link
        storageSpy.get = jasmine.createSpy('get').and.returnValue(true);
        environment.goMobile = false;

        let result;
        service.switchProgramAndNavigate(ProgramFixture[0]).then(data => {
          result = data;
        });
        flushMicrotasks();
        expect(storageSpy.get).toHaveBeenCalledWith('directLinkRoute');
        expect(storageSpy.remove).toHaveBeenCalledWith('directLinkRoute');
        expect(result).toEqual(true);
    }));

    it('should return [app, home] if programs is not an Array and got one program object (not direct link)', fakeAsync(() => {
        spyOn(utils, 'isEmpty').and.returnValue(false);
        spyOn(Array, 'isArray').and.returnValue(false);
        spyOn(service, 'switchProgram').and.returnValue(of({}));

        // disable direct-link
        storageSpy.get = jasmine.createSpy('get').and.returnValue(false);
        environment.goMobile = false;

        let result;
        service.switchProgramAndNavigate({}).then(data => {
          result = data;
        });
        flushMicrotasks();
        expect(storageSpy.get).toHaveBeenCalledWith('directLinkRoute');
        expect(storageSpy.remove).not.toHaveBeenCalledWith('directLinkRoute');
        expect(result).toEqual(['app', 'home']);
    }));
  });

  it('getProgresses should return correct value', () => {
    requestSpy.graphQLQuery.and.returnValue(of({
      data: {
        projects: [
          {
            id: 1,
            progress: 0.1,
            todoItems: [
              {
                isDone: true
              },
              {
                isDone: false
              },
              {
                isDone: true
              }
            ]
          },
          {
            id: 2,
            progress: 0.31,
            todoItems: [
              {
                isDone: true
              },
              {
                isDone: false
              },
              {
                isDone: false
              }
            ]
          }
        ]
      }
    }));
    service.getProgresses([1, 2]).subscribe(res => {
      expect(res).toEqual([
        {
          id: 1,
          progress: 0.1,
          todoItems: 1
        },
        {
          id: 2,
          progress: 0.31,
          todoItems: 2
        }
      ]);
    });
  });

  describe('switchProgram()', () => {
    beforeEach(() => {
      spyOn(service, 'getNewJwt').and.returnValue(of());
      spyOn(service, 'getTeamInfo').and.returnValue(of());
      spyOn(service, 'getMyInfo').and.returnValue(of());
      spyOn(service, 'getReviews').and.returnValue(of());
      spyOn(service, 'getEvents').and.returnValue(of());
      spyOn(sharedSpy, 'onPageLoad').and.returnValue(of());
    });

    /*beforeEach(() => {
      spyOn(service, 'getNewJwt');
      spyOn(service, 'getTeamInfo');
      spyOn(service, 'getMyInfo');
      spyOn(service, 'getReviews');
      spyOn(service, 'getEvents');
    });*/

    it('should collect related data based on selected program', async () => {
      const switcher = await service.switchProgram(ProgramFixture[0]);
      switcher.subscribe(() => {

        spyOn(utils, 'has');
        spyOn(service, 'getNewJwt');
        spyOn(service, 'getTeamInfo');
        spyOn(service, 'getMyInfo');
        spyOn(service, 'getReviews');
        spyOn(service, 'getEvents');

        expect(utils.has).toHaveBeenCalled();
        expect(storageSpy.setUser).toHaveBeenCalled();
        expect(sharedSpy.onPageLoad).toHaveBeenCalled();
        expect(service.getNewJwt).toHaveBeenCalled();
        expect(service.getTeamInfo).toHaveBeenCalled();
        expect(service.getMyInfo).toHaveBeenCalled();
        expect(service.getReviews).toHaveBeenCalled();
        expect(service.getEvents).toHaveBeenCalled();
      });
    });

    describe('with null experience config', () => {
      it('should collect related data based on selected program', fakeAsync(() => {
        const user = {
          enrolment: {
            contact_number: '0123456792'
          },
          themeColor: 'sample 3',
          programId: 3,
          programName: 'test program 3',
          programImage: undefined,
          hasReviewRating: false,
          truncateDescription: true,
          experienceId: 3,
          projectId: 3,
          timelineId: 3,
          contactNumber: '0123456792',
          activityCardImage: '',
          activityCompleteMessage: null,
          teamId: null,
          hasEvents: false,
          hasReviews: false
        };

        service.switchProgram(ProgramFixture[2]).then(switcher => {
          spyOn(utils, 'has');
          spyOn(service, 'getNewJwt');
          spyOn(service, 'getTeamInfo');
          spyOn(service, 'getMyInfo');
          spyOn(service, 'getReviews');
          spyOn(service, 'getEvents');

          expect(nativeStorageSpy.setObject).toHaveBeenCalledWith('me', user);
          flushMicrotasks();

          expect(storageSpy.setUser).toHaveBeenCalledWith(user);
          expect(sharedSpy.onPageLoad).toHaveBeenCalled();
          flushMicrotasks();

          switcher.toPromise().then(res => {
            console.log('ding', res);

            expect(service.getNewJwt).toHaveBeenCalled();
            expect(service.getTeamInfo).toHaveBeenCalled();
            expect(service.getMyInfo).toHaveBeenCalled();
            expect(service.getReviews).toHaveBeenCalled();
            expect(service.getEvents).toHaveBeenCalled();
          });
        });

        flush();
      }));
    });

    it('should collect related data based on selected program', fakeAsync(() => {
      service.switchProgram(ProgramFixture[0]);
      flushMicrotasks();

      expect(storageSpy.setUser).toHaveBeenCalled();
      expect(sharedSpy.onPageLoad).toHaveBeenCalled();
      expect(service.getNewJwt).toHaveBeenCalled();
      expect(service.getTeamInfo).toHaveBeenCalled();
      expect(service.getMyInfo).toHaveBeenCalled();
      expect(service.getReviews).toHaveBeenCalled();
      expect(service.getEvents).toHaveBeenCalled();
    }));

    it('should set the correct user data', fakeAsync(() => {
      const programObj = ProgramFixture[3];
      delete programObj.program.config.theme_color;
      service.switchProgram(programObj);
      flushMicrotasks();

      expect(storageSpy.setUser).toHaveBeenCalledWith({
        programId: ProgramFixture[3].program.id,
        programName: ProgramFixture[3].program.name,
        programImage: ProgramFixture[3].project.lead_image,
        hasReviewRating: false,
        truncateDescription: true,
        experienceId: ProgramFixture[3].program.experience_id,
        projectId: ProgramFixture[3].project.id,
        timelineId: ProgramFixture[3].timeline.id,
        contactNumber: ProgramFixture[3].enrolment.contact_number,
        themeColor: '#2bbfd4',
        activityCardImage: '',
        enrolment: ProgramFixture[3].enrolment,
        activityCompleteMessage: null,
        chatEnabled: true,
        teamId: null,
        hasEvents: false,
        hasReviews: false
      });
    }));
  });

  describe('switchProgram() with null experience', () => {
    it('should collect related data based on selected program', () => {
      service.switchProgram(ProgramFixture[3]).then(switcher => {
        switcher.subscribe(() => {
          spyOn(utils, 'has');
        });
      });
    });

    it('should set the correct user data', () => {
      const programObj = ProgramFixture[2];
      programObj.program.config = {
        theme_color: 'none',
        card_style: 'style',
        review_rating: true,
        truncate_description: false,
      };
      programObj.experience.config = {
        activity_complete_message: 'completed',
        chat_enable: false,
      };
      service.switchProgram(programObj).then(() => {
        expect(storageSpy.setUser).toHaveBeenCalledWith({
          programId: ProgramFixture[2].program.id,
          programName: ProgramFixture[2].program.name,
          programImage: ProgramFixture[2].project.lead_image,
          hasReviewRating: true,
          truncateDescription: false,
          experienceId: ProgramFixture[2].program.experience_id,
          projectId: ProgramFixture[2].project.id,
          timelineId: ProgramFixture[2].timeline.id,
          contactNumber: ProgramFixture[2].enrolment.contact_number,
          themeColor: 'none',
          activityCardImage: '/assets/style',
          enrolment: ProgramFixture[2].enrolment,
          activityCompleteMessage: 'completed',
          chatEnabled: false,
          teamId: null,
          hasEvents: false,
          hasReviews: false
        });
      });
    });
  });

  describe('getTeamInfo()', () => {
    it('should make API request to `api/teams.json`', () => {
      requestSpy.get.and.returnValue(of({
        success: true,
        data: {
          Teams: [
            { id: 1 }
          ]
        }
      }));

      service.getTeamInfo().subscribe();
      expect(requestSpy.get).toHaveBeenCalledWith('api/teams.json');
    });
  });

  describe('getMyInfo()', () => {
    it('should make API request to `api/users.json`', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          User: {
            name: 'name',
            contactNumber: 'contact_number',
            email: 'email',
            role: 'role',
            image: 'image',
            linkedinConnected: 'linkedinConnected',
            linkedinUrl: 'linkedin_url',
            userHash: 'userhash',
          }
        }
      }));

      service.getMyInfo().subscribe(res => {
        expect(requestSpy.get).toHaveBeenCalledWith('api/users.json');
      });
    });
  });

  describe('getReviews()', () => {
    it('should get events from API and store in browser cache', () => {
      spyOn(reviewSpy, 'getReviews').and.returnValue(new Observable());
      service.getReviews().subscribe(() => {
        expect(reviewSpy.getReviews).toHaveBeenCalled();
        expect(storageSpy.setUser).toHaveBeenCalled();
      });
    });
  });

  describe('getEvents()', () => {
    it('should get events from API and store in browser cache', () => {
      spyOn(eventSpy, 'getEvents').and.returnValue(new Observable());
      service.getEvents().subscribe(() => {
        expect(eventSpy.getEvents).toHaveBeenCalled();
        expect(storageSpy.setUser).toHaveBeenCalled();
      });
    });
  });

  describe('getNewJwt()', () => {
    it('should make api request to `api/v2/users/jwt/refresh.json`', () => {
      service.getNewJwt().subscribe(() => {
        expect(requestSpy.get).toHaveBeenCalledWith('api/v2/users/jwt/refresh.json');
      });
    });
  });
});
