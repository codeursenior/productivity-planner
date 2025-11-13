import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
} from '@angular/core';
import { getPomodoroListEmojiStatus, Task } from '../task.model';

@Component({
  selector: 'app-task-readonly',
  imports: [],
  templateUrl: './task-readonly.dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-testid]': '`task-${index()}`',
  },
})
export class TaskReadonlyDumbComponent {
  readonly task = input.required<Task>();
  readonly index = input.required<number>();

  constructor() {
    effect(() => {
      console.log(this.task());
    });
  }

  readonly pomodoroListEmojiStatus = computed(() => {
    return getPomodoroListEmojiStatus(this.task().pomodoroList);
  });
}
