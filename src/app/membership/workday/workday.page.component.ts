import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFieldDumbComponent } from './task-field/task-field.dumb.component';
import { TaskReadonlyDumbComponent } from './task-readonly/task-readonly.dumb.component';
import { WorkdayStore } from './workday.page.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workday.page.component.html',
  imports: [TaskFieldDumbComponent, TaskReadonlyDumbComponent],
  providers: [WorkdayStore],
})
export class WorkdayPageComponent {
  readonly store = inject(WorkdayStore);
}
