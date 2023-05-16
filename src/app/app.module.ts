import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackteamComponent } from './trackteam/trackteam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameresultComponent } from './gameresult/gameresult.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { SearchCityComponent } from './search-city/search-city.component';

@NgModule({
  declarations: [
    AppComponent,
    TrackteamComponent,
    GameresultComponent,
    ScoreCardComponent,
    SearchCityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
