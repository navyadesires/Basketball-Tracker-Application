import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackteamComponent } from './trackteam.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbatrackerService } from '../services/nbatracker.service';
import { of } from 'rxjs';
import { teamDetails } from '../interfaces/basketballtracking';

describe('TrackteamComponent', () => {
  let component: TrackteamComponent;
  let router: Router;
  let fixture: ComponentFixture<TrackteamComponent>;

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
    "data": [
        {
            "id": 473359,
            "date": "2021-10-04T00:00:00.000Z",
            "home_team": {
                "id": 16,
                "abbreviation": "MIA",
                "city": "Miami",
                "conference": "East",
                "division": "Southeast",
                "full_name": "Miami Heat",
                "name": "Heat"
            },
            "home_team_score": 125,
            "period": 4,
            "postseason": false,
            "season": 2021,
            "status": "Final",
            "time": "",
            "visitor_team": {
                "id": 1,
                "abbreviation": "ATL",
                "city": "Atlanta",
                "conference": "East",
                "division": "Southeast",
                "full_name": "Atlanta Hawks",
                "name": "Hawks"
            },
            "visitor_team_score": 99
        }
    ],
    "meta": {
        "total_pages": 522,
        "current_page": 1,
        "next_page": 2,
        "per_page": 12,
        "total_count": 6258
    }
}

  const nbaTrackerServiceMock = () => ({
    getTeamsData: () => of(getingTeamDetailsMock),
    getTeamDetails: () => of(getingTeamsMockData),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [TrackteamComponent],
      providers:[
        {
          provide : NbatrackerService,
         useFactory : nbaTrackerServiceMock,
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

  it('should navigate to gameresult page ', () => {
    const router = spyOn(component['router'], 'navigate').and.stub();
    const mockTeam = { abbreviation: 'BOS' };
    component.getResults(mockTeam);
    expect(router).toHaveBeenCalledWith(['/gameResult/BOS']);
  });

  it('should call getTeam Details ',()=>{
    component.getTeamDetails(1);
  })

});