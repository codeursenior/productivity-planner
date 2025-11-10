import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Task } from '../workday.page.store';

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
  readonly task = model.required<Task>();
  readonly index = input.required<number>();
}
