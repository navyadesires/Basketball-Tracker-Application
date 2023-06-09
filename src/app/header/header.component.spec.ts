import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NbatrackerService } from '../services/nbatracker.service';
import { teamDetails } from '../interfaces/basketballtracking';
import { TrackteamComponent } from '../trackteam/trackteam.component';
import {
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
  ProviderToken,
  Type,
} from '@angular/core';
// import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const trackTeamComponent = jasmine.createSpyObj('TrackteamComponent', [
    'getTeamDetails',
  ]);

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
      declarations: [HeaderComponent],
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

    fixture = TestBed.createComponent(HeaderComponent);
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
    console.log('seesion', sessionStorage.getItem('selectedTeam'));
    expect(sessionStorage.getItem('selectedTeam')).toBe('[1]');
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
