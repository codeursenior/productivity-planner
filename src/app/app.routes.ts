import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './membership/core/shell/shell.layout.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Productivity Planner',
    loadComponent: () => import('./visitor/home/home.page.component').then(component => component.HomePageComponent),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./visitor/login/login.page.component').then(component => component.LoginPageComponent),
  },
  {
    path: 'signup',
    title: 'Signup',
    loadComponent: () => import('./visitor/signup/signup.page.component').then(component => component.SignupPageComponent),
  },
  {
    path: 'app',
    title: 'Productivity Planner',
    component: ShellLayoutComponent,  
    loadChildren: () => import('./membership/membership.routes').then(routes => routes.membershipRoutes),
  },
];
