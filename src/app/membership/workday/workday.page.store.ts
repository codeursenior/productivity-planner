import { computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Workday } from '@app/core/entity/workday';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Subject, takeUntil, timer } from 'rxjs';
import { MAXIMUM_POMODORO_DURATION, Task } from './task.model';

interface WorkdayState {
  workday: Workday;
  progress: number;
}

export const WorkdayStore = signalStore(
  withState<WorkdayState>({
    workday: Workday.createEmpty(),
    progress: 0,
  }),
  withProps(() => ({
    destroyRef: inject(DestroyRef),
    /*
     * Using Subject for intra-store event.
     */
    pomodoroCompleted: new Subject<void>(),
  })),
  withComputed((state) => {
    const pomodoroProgress = computed(() => {
      return Math.floor((state.progress() / MAXIMUM_POMODORO_DURATION) * 100);
    });

    return {
      pomodoroProgress,
    };
  }),
  withMethods(({ destroyRef, pomodoroCompleted, ...store }) => ({
    startWorkday() {
      patchState(store, ({ workday }) => ({
        workday: workday.setExecutionMode(),
      }));
      timer(0, 1000)
        .pipe(takeUntil(pomodoroCompleted), takeUntilDestroyed(destroyRef))
        .subscribe((elapsedSeconds: number) => {
          patchState(store, { progress: elapsedSeconds });

          if (elapsedSeconds === Workday.MAX_POMODORO_DURATION_IN_SEC) {
            pomodoroCompleted.next();
            patchState(store, ({ workday }) => ({
              workday: workday.setEditMode(),
              progress: 0,
            }));

            return;
          }

          patchState(store, ({ workday }) => {
            return { workday: workday.tick() };
          });
        });
    },
    addTask() {
      patchState(store, ({ workday }) => ({
        workday: workday.addEmptyTask(),
      }));
    },
    removeTask(index: number) {
      patchState(store, ({ workday }) => ({
        workday: workday.removeTask(index),
      }));
    },
    updateDate(event: Event) {
      const date = (event.target as HTMLInputElement).value;
      patchState(store, ({ workday }) => ({
        workday: workday.createEmptyAtDate(date),
      }));
    },
    updateTask(index: number, updatedTask: Task) {
      patchState(store, ({ workday }) => ({
        workday: workday.updateTask(index, updatedTask),
      }));
    },
    // TODO: Persist current Workday on Firestore.
    // saveWorkday(workday: Workday): Observable<void> {
    //   console.log('Workday saved!', workday);
    //   return of(undefined);
    // },
  }))
);
