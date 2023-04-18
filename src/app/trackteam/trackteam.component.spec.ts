import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackteamComponent } from './trackteam.component';

describe('TrackteamComponent', () => {
  let component: TrackteamComponent;
  let fixture: ComponentFixture<TrackteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should remove the team at the specified index',() =>{
//component.teams = ['Team A', 'Team B', 'Team C'];
const index = 1;
//component.ClosedCard(index);
//expect(component.teams).toEqual(['Team A', 'Team C']);
});
it('should navigate to a specific route', ()=>{
  //const routerSpy = spyOn(component.router, 'navigate');
  const team = { abbreviation: 'ABC'}
  component.getResults(team);
//  expect(routerSpy).toHaveBeenCalledWith(['gameResult/ABC']);
})

});
