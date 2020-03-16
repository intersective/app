import { TestBed } from '@angular/core/testing';

import { FixOrientationService } from './fix-orientation.service';

describe('FixOrientationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FixOrientationService = TestBed.get(FixOrientationService);
    expect(service).toBeTruthy();
  });
});
