import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

interface Pomodoro {
  status: 'Not started' | 'In progress' | 'Done';
  currentTime: number;
  duration: number;
  isCompleted: boolean;
}

type PomodoroList = Pomodoro[];

interface Task {
  type: 'Hit the target' | 'Get things done';
  title: string;
  pomodoroCount: 1 | 2 | 3 | 4 | 5;
  pomodoroList: PomodoroList;
}

type TaskList = Task[];

interface WorkdayState {
  date: string;
  taskList: TaskList;
}

const getEmptyTask = (): Task => ({
  type: 'Hit the target',
  title: 'Nouvelle tâche',
  pomodoroCount: 1,
  pomodoroList: [
    {
      status: 'Not started',
      currentTime: 0,
      duration: 1500,
      isCompleted: false,
    },
  ],
});

const initialState: WorkdayState = {
  date: '',
  taskList: [getEmptyTask()],
};

const WORKDAY_TASK_LIMIT = 6;

export const WorkdayStore = signalStore(
  withState<WorkdayState>(initialState),
  withComputed((state) => {
    const taskCount = computed(() => state.taskList().length);
    const isButtonDisplayed = computed(() => taskCount() < WORKDAY_TASK_LIMIT);

    return { taskCount, isButtonDisplayed };
  }),
  withMethods((store) => ({
    onAddTask() {
      patchState(store, (state) => ({
        taskList: [...state.taskList, getEmptyTask()],
      }));
    },
  }))
);
