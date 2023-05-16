import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackteamComponent } from './trackteam/trackteam.component';
import { GameresultComponent } from './gameresult/gameresult.component';
import { ScoreCardComponent } from './score-card/score-card.component';

const routes: Routes = [
  { path: "", redirectTo:'score', pathMatch:'full'},
  {
    path: 'score', component: ScoreCardComponent
  },
  {
    path: 'gameResult/:teamCode', component: GameresultComponent
  },
  { path: '**', redirectTo:'score'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

