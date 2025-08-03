import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { UserFavoursComponent } from "./user-favours/user-favours.component";



export const ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
      { path: 'leaderboard', loadComponent: () => import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent) },
      { path: 'my-favours', loadComponent: () => import('./user-favours/user-favours.component').then(m => m.UserFavoursComponent) },
    ]
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  { path: '**', redirectTo: 'home' } // fallback
];
