import { TestBed } from '@angular/core/testing';
import { FastFeedbackService } from './fast-feedback.service';
import { of, throwError } from 'rxjs';
import { RequestService } from '@shared/request/request.service';
import { TestUtils } from '@testing/utils';
import { NotificationService } from '@shared/notification/notification.service';
import { BrowserStorageService } from '@services/storage.service';
import { UtilsService } from '@app/services/utils.service';

describe('FastFeedbackService', () => {
  let service: FastFeedbackService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let storageSpy: jasmine.SpyObj<BrowserStorageService>;
  const testUtils = new TestUtils();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FastFeedbackService,
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', ['get', 'post'])
        },
        {
          provide: NotificationService,
          useValue: jasmine.createSpyObj('NotificationService', ['modal'])
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', ['set', 'get'])
        }
      ]
    });
    service = TestBed.inject(FastFeedbackService);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    notificationSpy = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    storageSpy = TestBed.inject(BrowserStorageService) as jasmine.SpyObj<BrowserStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get fastfeedback from API', () => {
    requestSpy.get.and.returnValue(of({}));
    service.getFastFeedback().subscribe();
    expect(requestSpy.get.calls.count()).toBe(1);
  });

  /*it('should open fastfeedback modal', () => {
    service.fastFeedbackModal();
    expect(notificationSpy.modal.calls.count()).toBe(1);
  });*/

  describe('when testing pullFastFeedback()', () => {
    it('should pop up modal', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          slider: {
            length: 1
          },
          meta: {
            any: 'data'
          }
        }
      }));
      storageSpy.get.and.returnValue(false);
      service.pullFastFeedback().subscribe(res => {
        expect(storageSpy.set.calls.count()).toBe(1);
        expect(notificationSpy.modal.calls.count()).toBe(1);
      });
    });

    it('should not pop up modal when slider object length is 0', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          slider: {
            length: 0
          }
        }
      }));
      storageSpy.get.and.returnValue(false);
      service.pullFastFeedback().subscribe(res => {
        expect(storageSpy.set.calls.count()).toBe(0);
        expect(notificationSpy.modal.calls.count()).toBe(0);
      });
    });

    it('should not pop up modal when get storage returns false', () => {
      requestSpy.get.and.returnValue(throwError(''));
      storageSpy.get.and.returnValue(false);
      service.pullFastFeedback().subscribe(res => {
        expect(storageSpy.set.calls.count()).toBe(0);
        expect(notificationSpy.modal.calls.count()).toBe(0);
      });
    });

    it('should not popup modal when slider & meta are not available', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          slider: undefined,
          meta: undefined,
        }
      }));

      service.pullFastFeedback().subscribe(res => {
        expect(notificationSpy.modal).not.toHaveBeenCalled();
      });
    });

    it('should not popup modal when slider is not available', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          slider: [],
          meta: { hasValue: true},
        }
      }));

      service.pullFastFeedback().subscribe(res => {
        expect(notificationSpy.modal).not.toHaveBeenCalled();
      });
    });

    it('should not popup modal when meta is not available', () => {
      requestSpy.get.and.returnValue(of({
        data: {
          slider: [1, 2],
          meta: undefined,
        }
      }));

      service.pullFastFeedback().subscribe(res => {
        expect(notificationSpy.modal).not.toHaveBeenCalled();
      });
    });
  });

});
