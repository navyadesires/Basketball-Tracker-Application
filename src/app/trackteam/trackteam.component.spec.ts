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
});
