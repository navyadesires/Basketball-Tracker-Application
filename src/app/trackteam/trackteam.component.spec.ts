import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackteamComponent } from './trackteam.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbatrackerService } from '../services/nbatracker.service';
import { of, throwError } from 'rxjs';
import { teamDetails, teamResult } from '../interfaces/basketballtracking';

describe('TrackteamComponent', () => {
  let component: TrackteamComponent;
  let router: Router;
  let fixture: ComponentFixture<TrackteamComponent>;

  const error = new Error('Test Error');

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
        winner: true,
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
        winner: true,
      },
    ],
    meta: {
      total_pages: 522,
      current_page: 1,
      next_page: 2,
      per_page: 12,
      total_count: 6258,
    },
  };

  const nbaTrackerServiceMock = () => ({
    getTeamsData: () => of(getingTeamDetailsMock),
    getTeamDetails: () => of(getingTeamsMockData),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [TrackteamComponent],
      providers: [
        {
          provide: NbatrackerService,
          useFactory: nbaTrackerServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call getTeam Details when storage is not empty', () => {
    sessionStorage.setItem('selectedTeam', JSON.stringify([1]));
    const teamDetailsSpy = spyOn(component, 'getTeamDetails');
    component.ngOnInit();
    expect(teamDetailsSpy).toHaveBeenCalledWith(1);
  });

  it('should call get Team Details when team wins', () => {
    const mock: teamResult[] = [
      {
        teamDetails: getingTeamsMockData[0],
        modifiedTeamResults: getingTeamDetailsMock.data,
        avgPts: 125,
        concededPts: 0,
      },
      {
        teamDetails: getingTeamsMockData[1],
        modifiedTeamResults: getingTeamDetailsMock.data,
        avgPts: 99,
        concededPts: 0,
      },
    ];

    component.getTeamDetails(16);
    expect(component.teams.length).toBe(1);
  });

  it('should call get Team Details when team losses', () => {
    component.getTeamDetails(17);
  });

  it('should call get Team Details and get error in getTeamsData API', () => {
    const spy = spyOn(component['nba'], 'getTeamsData').and.returnValue(
      throwError(error)
    );
    component.getTeamDetails(17);
    expect(spy).toHaveBeenCalled();
  });

  it('should call get Team Details and get error in getTeamDetails API', () => {
    const spy = spyOn(component['nba'], 'getTeamDetails').and.returnValue(
      throwError(error)
    );
    component.getTeamDetails(17);
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to gameresult page ', () => {
    const router = spyOn(component['router'], 'navigate').and.stub();
    const mockTeam = { abbreviation: 'BOS' };
    component.getResults(mockTeam);
    expect(router).toHaveBeenCalledWith(['/gameResult/BOS']);
  });

  it(' should close the card', () => {
    const mock: teamResult[] = [
      {
        teamDetails: getingTeamsMockData[0],
        modifiedTeamResults: getingTeamDetailsMock.data,
        avgPts: 12,
        concededPts: 13,
      },
      {
        teamDetails: getingTeamsMockData[0],
        modifiedTeamResults: getingTeamDetailsMock.data,
        avgPts: 11,
        concededPts: 10,
      },
    ];

    component.teams = mock;
    component.closedCard(1);
    expect(component.teams.length).toBe(1);
    expect(component.teams).toEqual([mock[0]]);
  });
});
