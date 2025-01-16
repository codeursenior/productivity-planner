import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Productivity Planner',
  },
];
