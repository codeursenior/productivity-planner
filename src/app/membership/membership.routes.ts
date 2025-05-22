import { Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard/dashboard.page.component';
import { PlanningPageComponent } from './planning/planning.page.component';
import { ProfilePageComponent } from './profile/profile.page.component';
import { SettingsPageComponent } from './settings/settings.page.component';
import { WorkdayPageComponent } from './workday/workday.page.component';

export const membershipRoutes: Routes = [
	{
		path: 'dashboard',
		title: 'Dashboard',
		component: DashboardPageComponent,
	},
	{
		path: 'planning',
		title: 'Planning',
		component: PlanningPageComponent,
	},
	{
		path: 'workday',
		title: 'Workday',
		component: WorkdayPageComponent,
	},
	{
		path: 'profile',
		title: 'Profile',
		component: ProfilePageComponent,
	},
	{
		path: 'settings',
		title: 'Settings',
		component: SettingsPageComponent,
	},
]