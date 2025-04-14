import { concatMap, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';

export function initializeAutoConnectFactory(
  authenticationService: AuthenticationService,
  userService: UserService,
  userStore: UserStore,
  router: Router
): () => Observable<void> {
  return () => new Observable<void>((observer) => {
    const refreshToken = localStorage.getItem('jwtRefreshToken');

    if (!refreshToken) {
      observer.complete();
      return;
    }

     authenticationService.refreshToken(refreshToken).pipe(
      tap(({ jwtToken }) => {
        localStorage.setItem('jwtToken', jwtToken)
      }),
      concatMap(({ userId, jwtToken }) => userService.fetch(userId, jwtToken)),
     )
     .subscribe({
        next: (user) => {
          userStore.load(user);      
          router.navigate(['/app/dashboard']);
          observer.complete();
        },
        error: () => {
          observer.complete();
        }
    });
  })
}