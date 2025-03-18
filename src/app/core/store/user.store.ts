import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthenticationService } from '../port/authentication.service';
import { User, Visitor } from '../entity/user.interface';
import { UserService } from '../port/user.service';

interface UserState {
  user: User | undefined;
}

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
  withMethods(
    (
      store,
      authenticationService = inject(AuthenticationService),
      userService = inject(UserService)
    ) => ({
      register(visitor: Visitor): void {
        authenticationService
          .register(visitor.email, visitor.password)
          .subscribe((response) => {
            const user: User = {
              id: response.userId,
              name: visitor.name,
              email: visitor.email,
            };

            userService.create(user, response.jwtToken).subscribe({
              next: () => {
                patchState(store, { user });
              },
            });
          });
        // 👇 Updating state using the `patchState` function.
        // patchState(store, (state) => ({ filter: { ...state.filter, query } }));
      },
    })
  )
);
