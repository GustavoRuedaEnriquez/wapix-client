import { TestBed } from '@angular/core/testing';

import { NavbarDisplayGuard } from './navbar-display.guard';

describe('NavbarDisplayGuard', () => {
  let guard: NavbarDisplayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NavbarDisplayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
