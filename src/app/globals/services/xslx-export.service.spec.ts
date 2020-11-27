import { TestBed } from '@angular/core/testing';

import { XslxExportService } from './xslx-export.service';

describe('XslxExportService', () => {
  let service: XslxExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XslxExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
