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
type TaskType = 'Hit the target' | 'Get things done';
type PomodoroCount = 1 | 2 | 3 | 4 | 5;
interface Task {
  type: TaskType;
  title: string;
  pomodoroCount: PomodoroCount;
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

const WORKDAY_TASK_LIMIT = 6;

export const WorkdayStore = signalStore(
  withState<WorkdayState>({
    date: '2019-02-28',
    taskList: [getEmptyTask()],
  }),
  withComputed((state) => {
    const taskCount = computed(() => state.taskList().length);
    const isButtonDisplayed = computed(() => taskCount() < WORKDAY_TASK_LIMIT);
    const hasNoTaskPlanned = computed(() => taskCount() === 0);
    const hasTaskPlanned = computed(() => taskCount() > 0);

    return {
      taskCount,
      isButtonDisplayed,
      hasNoTaskPlanned,
      hasTaskPlanned,
    };
  }),
  withMethods((store) => ({
    onAddTask() {
      patchState(store, (state) => ({
        taskList: [...state.taskList, getEmptyTask()],
      }));
    },
    removeTask($index: number) {
      patchState(store, (state) => ({
        taskList: state.taskList.toSpliced($index, 1),
      }));
    },
    updateDate(event: Event) {
      const date = (event.target as HTMLInputElement).value;
      patchState(store, () => ({ date }));
    },
    updateTaskType($index: number, event: Event) {
      const type = (event.target as HTMLSelectElement).value as TaskType;

      patchState(store, (state) => {
        const task: Task = { ...state.taskList[$index], type };
        const taskList: TaskList = state.taskList.toSpliced($index, 1, task);
        return { taskList };
      });
    },
    updateTaskTitle($index: number, event: Event) {
      const title = (event.target as HTMLInputElement).value;

      patchState(store, (state) => {
        const task: Task = { ...state.taskList[$index], title };
        const taskList: TaskList = state.taskList.toSpliced($index, 1, task);
        return { taskList };
      });
    },
    updateTaskPomodoroCount($index: number, event: Event) {
      const pomodoroCount = Number(
        (event.target as HTMLSelectElement).value
      ) as PomodoroCount;

      patchState(store, (state) => {
        const task: Task = { ...state.taskList[$index], pomodoroCount };
        const taskList: TaskList = state.taskList.toSpliced($index, 1, task);
        return { taskList };
      });
    },
  }))
);
