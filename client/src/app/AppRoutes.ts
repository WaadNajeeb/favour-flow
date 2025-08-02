import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";



export const ROUTES: Routes = [
{
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'leaderboard', component: LeaderboardComponent }
    ]
  },
  { path: '**', redirectTo: 'home' } // fallback
];
