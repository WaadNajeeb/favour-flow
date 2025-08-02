import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { UserFavoursComponent } from "./user-favours/user-favours.component";



export const ROUTES: Routes = [
{
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'my-favours', component: UserFavoursComponent }
    ]
  },
  { path: '**', redirectTo: 'home' } // fallback
];
