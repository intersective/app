import { TestBed } from '@angular/core/testing';

import { NgxPracteraService } from './ngx-practera.service';

describe('NgxPracteraService', () => {
  let service: NgxPracteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPracteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
