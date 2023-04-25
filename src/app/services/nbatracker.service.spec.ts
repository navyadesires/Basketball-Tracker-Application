import { TestBed } from '@angular/core/testing';

import { NbatrackerService } from './nbatracker.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NbatrackerService', () => {
  let service: NbatrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(NbatrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getValue should return real value', () => {
  //  expect(service.getingTeams()).toBe('real value');
  });

});
