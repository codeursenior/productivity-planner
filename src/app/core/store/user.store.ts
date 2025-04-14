import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../entity/user.interface';

interface UserState {
  user: User | undefined;
}
export type UserStore = InstanceType<typeof UserStore>;
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: undefined,
  }),
  withComputed((store) => {
    const isGoogleUser = computed(
      () => !!store.user()?.email.endsWith('@google.com')
    );

    return { isGoogleUser };
  }),
  withMethods((store) => ({
    load(user: User): void {
      patchState(store, { user });
    },
  }))
);
