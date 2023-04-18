import { TestBed } from '@angular/core/testing';

import { NbatrackerService } from './nbatracker.service';

describe('NbatrackerService', () => {
  let service: NbatrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbatrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
