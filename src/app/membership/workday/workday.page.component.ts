import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFieldDumbComponent } from './task-field/task-field.dumb.component';
import { WorkdayStore } from './workday.page.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workday.page.component.html',
  styleUrl: './workday.page.component.scss',
  imports: [TaskFieldDumbComponent],
  providers: [WorkdayStore],
})
export class WorkdayPageComponent {
  readonly store = inject(WorkdayStore);
}
