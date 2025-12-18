import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFieldDumbComponent } from './task-field/task-field.dumb.component';
import { TaskReadonlyDumbComponent } from './task-readonly/task-readonly.dumb.component';
import { Task } from './task.model';
import { WorkdayStore } from './workday.page.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workday.page.component.html',
  imports: [TaskFieldDumbComponent, TaskReadonlyDumbComponent, JsonPipe],
  providers: [WorkdayStore],
})
export class WorkdayPageComponent {
  readonly #store = inject(WorkdayStore);

  readonly workday = this.#store.workday;
  readonly pomodoroProgress = this.#store.pomodoroProgress;
  readonly progress = this.#store.progress;

  addTask() {
    this.#store.addTask();
  }

  updateTask(index: number, updatedTask: Task) {
    this.#store.updateTask(index, updatedTask);
  }

  removeTask(index: number) {
    this.#store.removeTask(index);
  }

  startWorkday() {
    this.#store.startWorkday();
  }

  updateDate(event: Event) {
    this.#store.updateDate(event);
  }
}
