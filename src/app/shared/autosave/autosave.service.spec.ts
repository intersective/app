import { TestBed } from '@angular/core/testing';

import { AutosaveService } from './autosave.service';

describe('AutosaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutosaveService = TestBed.get(AutosaveService);
    expect(service).toBeTruthy();
  });
});
