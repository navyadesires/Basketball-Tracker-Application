import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { gameResultResponse, gamesData, teamDetails, teamsResponse } from '../interfaces/basketballtracking';

@Injectable({
  providedIn: 'root',
})
export class NbatrackerService {
 
  constructor(private http: HttpClient) {}

  private setHeaders(): HttpHeaders {
    const header: { [key: string]: string } = {
      'X-RapidAPI-Key': 'adb94d2021mshe5a67a9f391143ap1d9113jsn80417b58d797',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
    };
    return new HttpHeaders(header);
  }

  public getingTeams(): Observable<teamDetails[]> {
    const headerObj: Object = {
      headers: this.setHeaders(),
    };
    return this.http
      .get<teamsResponse>('https://free-nba.p.rapidapi.com/teams', headerObj)
      .pipe(
        map((response: teamsResponse) => {
          return response.data;
        })
      );
  }

  public getTeamDetails(id: number): Observable<teamDetails> {
    const headerObj: Object = {
      headers: this.setHeaders(),
    };
    return this.http.get<teamDetails>(
      `https://free-nba.p.rapidapi.com/teams/${id}`,
      headerObj
    );
  }

  public getTeamResults(): Observable<gamesData[]> {
    const headerObj: Object = {
      headers: this.setHeaders(),
    };
    return this.http
      .get<gameResultResponse>(`https://free-nba.p.rapidapi.com/games`, headerObj)
      .pipe(
        map((response: gameResultResponse): gamesData[] => {
          return response.data;
        })
      );
  }
  public getTeamsData(id: number): Observable<gameResultResponse> {
    const headerObj: Object = {
      headers: this.setHeaders(),
    };
    return this.http.get<gameResultResponse>(
      `https://free-nba.p.rapidapi.com/games?page=1&per_page=12&team_ids[]=${id}`,
      headerObj
    );
  }
}
