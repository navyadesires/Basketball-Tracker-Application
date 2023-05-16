
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbatrackerService } from '../services/nbatracker.service';
import { teamDetails } from '../interfaces/basketballtracking';
import {
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
  ProviderToken,
  Type,
} from '@angular/core';
import { of } from 'rxjs';
import { SearchCityComponent } from './search-city.component';

describe('SearchCityComponent', () => {
  let component: SearchCityComponent;
  let fixture: ComponentFixture<SearchCityComponent>;
  const trackTeamComponent = jasmine.createSpyObj('TrackteamComponent', ['getTeamDetails']);

  const teamForm = new FormBuilder().group({
    team: [null],
  });

  const teamFormPatched = new FormBuilder().group({
    team: [1],
  });

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

  const nbaTrackerServiceMock = () => ({
    getingTeams: () => of(getingTeamsMockData),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchCityComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: NbatrackerService,
          useFactory: nbaTrackerServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCityComponent);
    component = fixture.componentInstance;
    component.trackteamComponent = trackTeamComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngoninit', () => {
    const loadTeamsPay = spyOn(component, 'loadingTeams');
    component.ngOnInit();
    expect(loadTeamsPay).toHaveBeenCalled();
  });

  it('should call sumbit', () => {
    component.teamForm = teamFormPatched;
    sessionStorage.clear();
    component.submit();
    expect(component.teamForm.value.team).toBe(1);
    expect(sessionStorage.getItem('selectedTeam')).toBe('[1]');
  });

  it('should update currentTeam with the value from teamForm', () => {
    const teamFormValue = { team: 'current team' };
    component.teamForm.setValue(teamFormValue);
    component.submit();
    expect(component.currentTeam).toEqual(teamFormValue.team);
  });

  it('should store the selected team in sessionStorage', () => {
    const teamFormValue = { team: 'current team' };
    component.teamForm.setValue(teamFormValue);
    component.submit();
    const storedTeams = JSON.parse(sessionStorage.getItem('selectedTeam') || '[]');
    expect(storedTeams).toContain(teamFormValue.team);
  });

  it('should call game responce using loadingTeams', () => {
    component.loadingTeams();
    expect(component.teams).toEqual(getingTeamsMockData);
  });

  it('should call Team details', () => {
    component.trackteamComponent = trackTeamComponent;
    component.teamForm = teamFormPatched;
    component.getTeamDetails();
    expect(trackTeamComponent.getTeamDetails).toHaveBeenCalled();
    expect(component.teamForm.value.team).toBe(1);
  });
});

