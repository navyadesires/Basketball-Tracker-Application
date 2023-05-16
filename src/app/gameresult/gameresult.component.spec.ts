import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameresultComponent } from './gameresult.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbatrackerService } from '../services/nbatracker.service';
import { of } from 'rxjs';
import { gamesData } from '../interfaces/basketballtracking';

describe('GameresultComponent', () => {
  let component: GameresultComponent;
  let fixture: ComponentFixture<GameresultComponent>;

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
    },
  ];

  const nbaGameResultMock = () => ({
    getTeamResults: () => of(getGameResultsMockData),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameresultComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: NbatrackerService,
          useFactory: nbaGameResultMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const gameResultInfo = spyOn(component, 'getGameResults');
    component.ngOnInit();
    expect(gameResultInfo).toHaveBeenCalled();
  });

  it('should call back button', () => {
    spyOn(component['route'], 'navigate');
    component.backBtn();
  });

  it('should create Results for selected team(when Visitors Team)', () => {
    component['router'].params = of({ teamCode: 'CHA' });
    component.getGameResults();
    expect(component.selectedTeamResults).toEqual(getGameResultsMockData);
    expect(component.TeamFullName).toBe('Charlotte Hornets');
    expect(component.conference).toBe('East');
  });

  it('should create Results for selected team(when Home Team)', () => {
    component['router'].params = of({ teamCode: 'BOS' });
    component.getGameResults();
    expect(component.selectedTeamResults).toEqual(getGameResultsMockData);
    expect(component.TeamFullName).toBe('Boston Celtics');
    expect(component.conference).toBe('East');
  });
});
