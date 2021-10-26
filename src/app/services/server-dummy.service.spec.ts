import { TestBed } from '@angular/core/testing';

import { ServerDummyService } from './server-dummy.service';

describe('ServerDummyService', () => {
  let service: ServerDummyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerDummyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
