import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameresultComponent } from './gameresult.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbatrackerService } from '../services/nbatracker.service';

describe('GameresultComponent', () => {
  let component: GameresultComponent;
  let fixture: ComponentFixture<GameresultComponent>;

  const trackTeamComponent = jasmine.createSpyObj('gameresultteamComponent', [
    'getTeamResults',
  ]);
  // const nbaTrackerServiceMock  = () => {

  // }

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
          //  useFactory : nbaTrackerServiceMock,
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

  // it('should call ngOnInit', () => {
  //   const loadTeamInfo = spyOn(component, 'getGameResults');
  //   component.ngOnInit;
  //   expect(loadTeamInfo).toHaveBeenCalled();
  // });

  it('should call back button', () =>{
component.backBtn();
  });

  it('should create game Results', () => {
    component.getGameResults();
   // expect().toBe(1)
  });
  
  
});
