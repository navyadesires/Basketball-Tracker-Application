import { Component, OnInit, ViewChild } from '@angular/core';
import { NbatrackerService } from '../services/nbatracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { gamesData, teamDetails } from '../interfaces/basketballtracking';

@Component({
  selector: 'app-gameresult',
  templateUrl: './gameresult.component.html',
  styleUrls: ['./gameresult.component.scss'],
})
export class GameresultComponent implements OnInit {
  selectedTeam! : string;
  selectedTeamResults: gamesData[] | undefined;
  TeamFullName! : string;
  conference : string | undefined;

  constructor(
    private nba: NbatrackerService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getGameResults();
  }

  backBtn(): void {
     this.nba.getTeamResults().subscribe((resp) => {
        this.route.navigate(['/header']);
     });
  }

  getGameResults(): void {
    this.router.params.subscribe((params) => {
      this.selectedTeam = params['teamCode'];
    });
    this.nba.getTeamResults().subscribe((resp : gamesData[]) => {
      this.selectedTeamResults = resp.filter(
        (obj: gamesData) : boolean =>
          obj.home_team.abbreviation === this.selectedTeam ||
          obj.visitor_team.abbreviation === this.selectedTeam
      );
      if (this.selectedTeamResults[0].home_team.abbreviation === this.selectedTeam) {
        this.TeamFullName = this.selectedTeamResults[0].home_team.full_name;
        this.conference = this.selectedTeamResults[0].home_team.conference;
      } else {
        this.TeamFullName = this.selectedTeamResults[0].visitor_team.full_name;
        this.conference = this.selectedTeamResults[0].visitor_team.conference;
      }
    });
  }
}
