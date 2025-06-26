import { computed } from '@angular/core';
import { signalStore, withComputed, withState } from '@ngrx/signals';

interface Pomodoro {
  status: 'Not started' | 'In progress' | 'Done';
}

type PomodoroList =
  | [Pomodoro]
  | [Pomodoro, Pomodoro]
  | [Pomodoro, Pomodoro, Pomodoro]
  | [Pomodoro, Pomodoro, Pomodoro, Pomodoro]
  | [Pomodoro, Pomodoro, Pomodoro, Pomodoro, Pomodoro];

interface Task {
  type: 'Hit the target' | 'Get things done';
  title: string;
  pomodoroCount: 1 | 2 | 3 | 4 | 5;
  pomodoroList: PomodoroList;
}

type TaskList =
  | [Task]
  | [Task, Task]
  | [Task, Task, Task]
  | [Task, Task, Task, Task]
  | [Task, Task, Task, Task, Task]
  | [Task, Task, Task, Task, Task, Task];

interface WorkdayState {
  date: string;
  taskList: TaskList;
}

const initialState: WorkdayState = {
  date: '',
  taskList: [
    {
      type: 'Hit the target',
      title: 'Nouvelle tâche',
      pomodoroCount: 1,
      pomodoroList: [{ status: 'Not started' }],
    },
  ],
};

export const WorkdayStore = signalStore(
  withState<WorkdayState>(initialState),
  withComputed((store) => {
    const mostImportantTask = computed(
      () => store.taskList()[0]
    );

    return { mostImportantTask };
}),

);
