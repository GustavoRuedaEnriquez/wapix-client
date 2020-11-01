import { TestBed } from '@angular/core/testing';

import { WapixService } from './wapix.service';

describe('WapixService', () => {
  let service: WapixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WapixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
