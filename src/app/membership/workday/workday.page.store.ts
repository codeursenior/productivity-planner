import { computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Subject, takeUntil, timer } from 'rxjs';
import {
  getActivePomodoroIndex,
  getActiveTask,
  getActiveTaskIndex,
  getTaskEmojiStatus,
  isTaskCompleted,
  MAXIMUM_POMODORO_DURATION,
  Task,
  TaskList,
} from './task.model';

interface WorkdayState {
  date: string;
  taskList: TaskList;
  progress: number;
  mode: 'edit' | 'execution';
}

const getEmptyTask = (): Task => ({
  type: 'Hit the target',
  title: 'Nouvelle tâche',
  status: 'Not started',
  pomodoroCount: 1,
  pomodoroList: [0],
  statusEmoji: '🏁',
});

const WORKDAY_TASK_LIMIT = 6;

export const WorkdayStore = signalStore(
  withState<WorkdayState>({
    date: '2019-02-28',
    taskList: [getEmptyTask()],
    progress: 0,
    mode: 'edit',
  }),
  withProps(() => ({
    destroyRef: inject(DestroyRef),
    pomodoroCompleted: new Subject<void>(),
  })),
  withComputed((state) => {
    const taskCount = computed(() => state.taskList().length);
    const isButtonDisplayed = computed(() => taskCount() < WORKDAY_TASK_LIMIT);
    const hasNoTaskPlanned = computed(() => taskCount() === 0);
    const hasTaskPlanned = computed(() => taskCount() > 0);
    const isEditMode = computed(() => state.mode() === 'edit');
    const isExecutionMode = computed(() => state.mode() === 'execution');
    const pomodoroProgress = computed(() => {
      return Math.floor((state.progress() / MAXIMUM_POMODORO_DURATION) * 100);
    });

    return {
      taskCount,
      isButtonDisplayed,
      hasNoTaskPlanned,
      hasTaskPlanned,
      isEditMode,
      isExecutionMode,
      pomodoroProgress,
    };
  }),
  withMethods(({ destroyRef, pomodoroCompleted, ...store }) => ({
    startWorkday() {
      patchState(store, { mode: 'execution' });
      console.log('Workday started!');
      timer(0, 1000)
        .pipe(takeUntil(pomodoroCompleted), takeUntilDestroyed(destroyRef))
        .subscribe((elapsedSeconds: number) => {
          console.log('elapsedSeconds', elapsedSeconds);

          patchState(store, { progress: elapsedSeconds });
          patchState(store, (state) => {
            // Update current pomodoro time
            const task = getActiveTask(state.taskList);
            const taskIndex = getActiveTaskIndex(state.taskList);

            if (!task) {
              throw new Error('No active task found');
            }

            const pomodoroIndex = getActivePomodoroIndex(task);

            if (pomodoroIndex === -1) {
              throw new Error('No active pomodoro found');
            }

            task.pomodoroList[pomodoroIndex] = elapsedSeconds;
            task.statusEmoji = getTaskEmojiStatus(task);

            const taskList: TaskList = store
              .taskList()
              .toSpliced(taskIndex, 1, task);

            return { taskList };
          });

          // Check completed state
          if (elapsedSeconds === MAXIMUM_POMODORO_DURATION) {
            pomodoroCompleted.next();
            patchState(store, { mode: 'edit', progress: 0 });
          }
        });
    },
    isWorkdayCompleted(): boolean {
      return store.taskList().every((task) => {
        return isTaskCompleted(task);
      });
    },
    isTaskCompleted(task: Task): boolean {
      return isTaskCompleted(task);
    },
    addTask() {
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
    updateTask(index: number, updatedTask: Task) {
      patchState(store, (state) => {
        const taskList: TaskList = state.taskList.toSpliced(
          index,
          1,
          updatedTask
        );
        return { taskList };
      });
    },
  }))
);
