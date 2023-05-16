import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbatrackerService } from '../services/nbatracker.service';
import { GameresultComponent } from '../gameresult/gameresult.component';
import { Router } from '@angular/router';
import {
  gameResultResponse,
  gamesData,
  teamDetails,
  teamResult,
} from '../interfaces/basketballtracking';

@Component({
  selector: 'app-trackteam',
  templateUrl: './trackteam.component.html',
  styleUrls: ['./trackteam.component.scss'],
})
export class TrackteamComponent implements OnInit {
  // @Input() trackTeam: string = '';

  @ViewChild(GameresultComponent) gameresult!: GameresultComponent;
  teams: teamResult[] = [];
  teamForm!: FormGroup;

  constructor(private nba: NbatrackerService, private router: Router) {}

  ngOnInit(): void {
    let storage = sessionStorage.getItem('selectedTeam');
    if (storage !== null) {
      let teams = JSON.parse(storage);
      teams.forEach((teamId: number) => {
        this.getTeamDetails(teamId);
      });
    }
  }

  getTeamDetails(value: number): void {
    this.nba.getTeamDetails(value).subscribe(
      (resp: teamDetails): void => {
        let teamResults;
        let avgScore = 0;
        let concededScore = 0;
        this.nba.getTeamsData(value).subscribe(
          (teamResult: gameResultResponse): void => {
            teamResults = teamResult.data;
            teamResults.forEach((obj: gamesData): void => {
              if (obj.home_team.id === value) {
                obj['winner'] =
                  obj.home_team_score > obj.visitor_team_score ? true : false;
                avgScore = obj.home_team_score + avgScore;
                if (!obj['winner']) {
                  concededScore =
                    obj.visitor_team_score -
                    obj.home_team_score +
                    concededScore;
                }
              } else {
                obj['winner'] =
                  obj.visitor_team_score > obj.home_team_score ? true : false;
                avgScore = obj.visitor_team_score + avgScore;
                if (!obj['winner']) {
                  concededScore =
                    obj.home_team_score -
                    obj.visitor_team_score +
                    concededScore;
                }
              }
            });
            if (
              !this.teams.find(
                (obj: teamResult) =>
                  obj.teamDetails.abbreviation === resp.abbreviation
              )
            ) {
              this.teams.push({
                teamDetails: resp,
                modifiedTeamResults: teamResults,
                avgPts: avgScore,
                concededPts: concededScore,
              });
            }
          },
          (err: Error) => console.error(err)
        );
      },
      (err: Error) => console.error(err)
    );
  }

  getResults(team: any): void {
    this.router.navigate(['/gameResult/' + team.abbreviation]);
  }
  closedCard(i: number): void {
    this.teams.splice(i, 1);
  }
}
