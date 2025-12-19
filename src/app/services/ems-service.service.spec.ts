import { TestBed } from '@angular/core/testing';

import { EmsServiceService } from './ems-service.service';

describe('EmsServiceService', () => {
  let service: EmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
