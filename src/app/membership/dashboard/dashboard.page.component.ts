import { Component, inject } from '@angular/core';
import { UserStore } from '@app/core/store/user.store';

@Component({
  imports: [],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.scss'
})
export class DashboardPageComponent {
  readonly store = inject(UserStore);
}
