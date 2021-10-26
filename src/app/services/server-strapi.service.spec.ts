import { TestBed } from '@angular/core/testing';

import { ServerStrapiService } from './server-strapi.service';

describe('ServerStrapiService', () => {
  let service: ServerStrapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerStrapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
