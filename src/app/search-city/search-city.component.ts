import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbatrackerService } from '../services/nbatracker.service';
import { TrackteamComponent } from '../trackteam/trackteam.component';
import { teamDetails } from '../interfaces/basketballtracking';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {

  currentTeam: string = '';
  teamForm!: FormGroup;
  teams!: teamDetails[];

  @ViewChild(TrackteamComponent) trackteamComponent!: TrackteamComponent;

  constructor(private fb: FormBuilder, private nba: NbatrackerService) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      team: [null],
    });
    this.loadingTeams();
  }
  submit(): void {
    this.currentTeam = this.teamForm.value.team;
    let teams = [];
    let storage = sessionStorage.getItem('selectedTeam');
    if (storage) {
      let storedTeams = JSON.parse(storage);
      if (
        storedTeams.find(
          (teamId: number) => teamId === this.teamForm.value.team
        )
      ) {
        sessionStorage.setItem('selectedTeam', JSON.stringify(storedTeams));
      } else {
        storedTeams.push(this.teamForm.value.team);
        sessionStorage.setItem('selectedTeam', JSON.stringify(storedTeams));
      }
    } else {
      teams.push(this.teamForm.value.team);
      sessionStorage.setItem('selectedTeam', JSON.stringify(teams));
    }
  }

  loadingTeams(): void {
    this.nba.getingTeams().subscribe((data: teamDetails[]) => {
      this.teams = data;
    });
  }
  
  getTeamDetails(): void {
    this.trackteamComponent.getTeamDetails(this.teamForm.value.team);
  }
}
