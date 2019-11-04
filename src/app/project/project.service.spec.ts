import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { of } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { UtilsService } from '@services/utils.service';
import { BrowserStorageService } from '@services/storage.service';
import { TestUtils } from '@testing/utils';

describe('ProjectService', () => {
  let service: ProjectService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let utils: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get', 'post', 'postGraphQL'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', {
            getUser: {
              projectId: 1
            }
          })
        },
      ]
    });
    service = TestBed.get(ProjectService);
    requestSpy = TestBed.get(RequestService);
    utils = TestBed.get(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when testing getProject(), should return correct data', () => {
    const response = {
      success: true,
      data: Array.from({length: 5}, (x, i) => {
        return {
          id: i + 1,
          name: 'm' + i,
          description: 'des' + i,
          is_locked: false,
          progress: (i + 1) / 10,
          Activity: Array.from({length: 3}, (y, j) => {
            return {
              id: i * 10 + j + 1,
              name: 'activity name' + j,
              is_locked: false,
              lead_image: '',
              progress: (i * 10 + j + 1) / 100,
            };
          })
        };
      })
    };
    const expected = Array.from({length: 5}, (x, i) => {
      return {
        id: i + 1,
        name: 'm' + i,
        description: 'des' + i,
        isLocked: false,
        progress: (i + 1) / 10,
        Activity: Array.from({length: 3}, (y, j) => {
          return {
            id: i * 10 + j + 1,
            name: 'activity name' + j,
            isLocked: false,
            leadImage: '',
            progress: (i * 10 + j + 1) / 100,
          };
        })
      };
    });
    requestSpy.postGraphQL.and.returnValue(of(response));
    service.getProject().subscribe(milestones => expect(milestones).toEqual(expected));
  });

  it('when testing getOverview(), it should return correct data', () => {
    const response = {id: 2};
    requestSpy.get.and.returnValue(of(response));
    service.getOverview().subscribe(res => expect(res).toEqual(response));
  });
});
