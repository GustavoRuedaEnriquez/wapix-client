import { TestBed } from '@angular/core/testing';

import { NavbarConfigService } from './navbar-config.service';

describe('NavbarConfigService', () => {
  let service: NavbarConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
