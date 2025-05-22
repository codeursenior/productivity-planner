import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';
import { PlanningPageComponent } from './membership/planning/planning.page.component';
import { WorkdayPageComponent } from './membership/workday/workday.page.component';
import { ProfilePageComponent } from './membership/profile/profile.page.component';
import { SettingsPageComponent } from './membership/settings/settings.page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Productivity Planner',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login'
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'Signup',
  },
  {
    path: 'app/dashboard',
    component: DashboardPageComponent,
    title: 'Dashboard',
  },
  {
    path: 'app/planning',
    component: PlanningPageComponent,
    title: 'Planning',
  },
  {
    path: 'app/workday',
    component: WorkdayPageComponent,
    title: 'Workday',
  },
  {
    path: 'app/profile',
    component: ProfilePageComponent,
    title: 'Profile',
  },
  {
    path: 'app/settings',
    component: SettingsPageComponent,
    title: 'Settings',
  },
];
