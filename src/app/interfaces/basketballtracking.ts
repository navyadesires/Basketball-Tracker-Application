export interface teamsResponse {
  data: teamDetails[];
  meta: meta;
}

export interface teamDetails {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface teamResult {
  teamDetails: teamDetails;
  modifiedTeamResults: gamesData[];
  avgPts: number,
  concededPts: number,
}

export interface meta
{
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}

export interface gamesData {
  teamDetails: any;
  id: number;
  date: string;
  home_team: teamDetails;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: teamDetails;
  visitor_team_score: number;
  winner: boolean;
}

export interface gameResultResponse {
  data: gamesData[];
  meta: meta;
}

export interface avarage{
  avgPts:number;
  concededPts: number;
}
