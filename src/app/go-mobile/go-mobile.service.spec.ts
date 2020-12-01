import { TestBed } from '@angular/core/testing';
import { GoMobileService } from './go-mobile.service';
import { SharedService, Profile } from '@services/shared.service';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { MockRouter } from '@testing/mocked.service';
import { Apollo } from 'apollo-angular';

describe('GoMobileService', () => {
  let service: GoMobileService;
  let sharedService: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        Apollo,
        GoMobileService,
        {
          provide: SharedService,
          useValue: jasmine.createSpyObj(['updateProfile'])
        }
      ],
    });

    service = TestBed.inject(GoMobileService);
    sharedService = TestBed.inject(SharedService);
  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });

  describe('submit()', () => {
    it('should update profile through shareService.updateProfile', () => {
      const profile = {
        contact_number: '1234567890',
        email: 'test@email.com',
        sendsms: true,
      };

      service.submit(profile);
      expect(sharedService.updateProfile).toHaveBeenCalledWith(jasmine.objectContaining(profile));
    });
  });
});
