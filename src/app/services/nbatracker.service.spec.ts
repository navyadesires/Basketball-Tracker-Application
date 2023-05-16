import { TestBed } from '@angular/core/testing';

import { NbatrackerService } from './nbatracker.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { gamesData, teamDetails } from '../interfaces/basketballtracking';
import { of } from 'rxjs';

describe('NbatrackerService', () => {
  let service: NbatrackerService;
  let httpTestingController: HttpTestingController;

  const host = 'free-nba.p.rapidapi.com';
  const key = 'adb94d2021mshe5a67a9f391143ap1d9113jsn80417b58d797';
  const config = {
    XRapidAPIKey: key,
  };

  const getingTeamsMockData: teamDetails[] = [
    {
      id: 1,
      abbreviation: 'test',
      city: 'test',
      conference: 'test',
      division: 'test',
      full_name: 'test',
      name: 'test',
    },
  ];

const getTeamResultMockData: teamDetails={
  abbreviation:"DAL",
  city:"Dallas",
  conference:"West",
  division: "Southwest",
  full_name:"Dallas Mavericks",
  id: 7,
  name:"Mavericks",
};

const getGameResultsMockData: gamesData[] = [
  {
    id: 47179,
    date: '2019-01-30T00:00:00.000Z',
    home_team: {
      id: 2,
      abbreviation: 'BOS',
      city: 'Boston',
      conference: 'East',
      division: 'Atlantic',
      full_name: 'Boston Celtics',
      name: 'Celtics',
    },
    home_team_score: 126,
    period: 4,
    postseason: false,
    season: 2018,
    status: 'Final',
    time: ' ',
    visitor_team: {
      id: 4,
      abbreviation: 'CHA',
      city: 'Charlotte',
      conference: 'East',
      division: 'Southeast',
      full_name: 'Charlotte Hornets',
      name: 'Hornets',
    },
    visitor_team_score: 94,
    winner: true,
  }
];

const getingTeamDetailsMock = {
  data: [
    {
      id: 473359,
      date: '2021-10-04T00:00:00.000Z',
      home_team: {
        id: 16,
        abbreviation: 'MIA',
        city: 'Miami',
        conference: 'East',
        division: 'Southeast',
        full_name: 'Miami Heat',
        name: 'Heat',
      },
      home_team_score: 125,
      period: 4,
      postseason: false,
      season: 2021,
      status: 'Final',
      time: '',
      visitor_team: {
        id: 1,
        abbreviation: 'ATL',
        city: 'Atlanta',
        conference: 'East',
        division: 'Southeast',
        full_name: 'Atlanta Hawks',
        name: 'Hawks',
      },
      visitor_team_score: 99,
      winner: true
    },
    {
      id: 473359,
      date: '2021-10-04T00:00:00.000Z',
      home_team: {
        id: 17,
        abbreviation: 'MIA',
        city: 'Miami',
        conference: 'East',
        division: 'Southeast',
        full_name: 'Miami Heat',
        name: 'Heat',
      },
      home_team_score: 90,
      period: 4,
      postseason: false,
      season: 2021,
      status: 'Final',
      time: '',
      visitor_team: {
        id: 2,
        abbreviation: 'ATL',
        city: 'Atlanta',
        conference: 'East',
        division: 'Southeast',
        full_name: 'Atlanta Hawks',
        name: 'Hawks',
      },
      visitor_team_score: 99,
      winner: true
    }
  ],
  meta: {
    total_pages: 522,
    current_page: 1,
    next_page: 2,
    per_page: 12,
    total_count: 6258,
  },
};


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(NbatrackerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check config', () => {
    expect(service['_key']).toBe(key);
    expect(service['_config']).toEqual(config);
  });

  it('should call setHeaders method', () => {
    {
      const expectOp = service['setHeaders']();
      expect(expectOp.get('X-RapidAPI-Key')).toBe(key);
      expect(expectOp.get('X-RapidAPI-Host')).toBe(host);
    }
  });

  it('should return expected teams call getingTeams', () => {
    const setHeader = jasmine.createSpyObj('service', ['setHeaders']);
    service['setHeaders'] = setHeader.setHeaders;
    service.getingTeams().subscribe();
    const testRequest = httpTestingController.expectOne('https://free-nba.p.rapidapi.com/teams');
    expect(testRequest).toBeDefined();
    spyOn(service['http'], 'get').and.returnValue(of(getingTeamsMockData));
    service.getingTeams().subscribe();
  });

  it('should return expected teams call getTeamDetails', () => {
    const setHeader = jasmine.createSpyObj('service', ['setHeaders']);
    service['setHeaders'] = setHeader.setHeaders;
    service.getTeamDetails(1).subscribe();
    const testRequest = httpTestingController.expectOne('https://free-nba.p.rapidapi.com/teams/1');
    expect(testRequest).toBeDefined();
    spyOn(service['http'], 'get').and.returnValue(of(getTeamResultMockData));
    service.getTeamDetails(1).subscribe();
  });

  it('should return expected teams call getTeamResults', () => {
    const setHeader = jasmine.createSpyObj('service', ['setHeaders']);
    service['setHeaders'] = setHeader.setHeaders;
    service.getTeamResults().subscribe();
    const testRequest = httpTestingController.expectOne('https://free-nba.p.rapidapi.com/games');
    expect(testRequest).toBeDefined();
   spyOn(service['http'], 'get').and.returnValue(of(getingTeamDetailsMock));
   service.getTeamResults().subscribe();
  });
  
  it('should return expected teams call getTeamsData', () => {
    const setHeader = jasmine.createSpyObj('service', ['setHeaders']);
    service['setHeaders'] = setHeader.setHeaders;
    service.getTeamsData(1).subscribe();
    const testRequest = httpTestingController.expectOne('https://free-nba.p.rapidapi.com/games?page=1&per_page=12&team_ids[]=1');
    expect(testRequest).toBeDefined();
   });

});
