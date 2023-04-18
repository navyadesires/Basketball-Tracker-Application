import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TrackteamComponent } from './trackteam/trackteam.component';
import { GameresultComponent } from './gameresult/gameresult.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent},
  { path: "", redirectTo:'header', pathMatch:'full'},
  { path: 'trackTeam', component: TrackteamComponent},
  { path: 'gameResult/:teamCode', component: GameresultComponent},
  { path: '**', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
