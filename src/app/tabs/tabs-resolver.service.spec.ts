import { TestBed } from '@angular/core/testing';

import { TabsResolverService } from './tabs-resolver.service';

describe('TabsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabsResolverService = TestBed.get(TabsResolverService);
    expect(service).toBeTruthy();
  });
});
