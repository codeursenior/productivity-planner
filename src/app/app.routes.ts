import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Productivity Planner',
    loadComponent: () => import('./visitor/home/home.page.component').then(c => c.HomePageComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./visitor/login/login.page.component').then(c => c.LoginPageComponent),
    title: 'Login'
  },
  {
    path: 'signup',
    loadComponent: () => import('./visitor/signup/signup.page.component').then(c => c.SignupPageComponent),
    title: 'Signup',
  },
  {
    path: 'app/dashboard',
    loadComponent: () => import('./membership/dashboard/dashboard.page.component').then(c => c.DashboardPageComponent),
    title: 'Dashboard',
  },
  {
    path: 'app/planning',
    loadComponent: () => import('./membership/planning/planning.page.component').then(c => c.PlanningPageComponent),
    title: 'Planning',
  },
  {
    path: 'app/workday',
    loadComponent: () => import('./membership/workday/workday.page.component').then(c => c.WorkdayPageComponent),
    title: 'Workday',
  },
  {
    path: 'app/profile',
    loadComponent: () => import('./membership/profile/profile.page.component').then(c => c.ProfilePageComponent),
    title: 'Profile',
  },
  {
    path: 'app/settings',
    loadComponent: () => import('./membership/settings/settings.page.component').then(c => c.SettingsPageComponent),
    title: 'Settings',
  },
];
