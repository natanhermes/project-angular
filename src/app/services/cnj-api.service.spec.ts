import { TestBed } from '@angular/core/testing';

import { CnjApiService } from './cnj-api.service';

describe('CnjApiService', () => {
  let service: CnjApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CnjApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
