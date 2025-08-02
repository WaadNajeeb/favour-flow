import { Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";



export const ROUTES: Routes = [
{
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: '**', redirectTo: 'home' } // fallback
];
