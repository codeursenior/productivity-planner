import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserEmailNotFoundError } from './user-email-not-found.error';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserStore } from '@app/core/store/user.store';
import { UserService } from '@app/core/port/user.service';
import { Router } from '@angular/router';
import { InvalidPasswordError } from './invalid-password.error';

@Injectable({
  providedIn: 'root'
})
export class LoginUserUseCase {
  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);
  readonly #userStore = inject(UserStore);
  readonly #router = inject(Router);

  async exectute(email: string, password: string): Promise<void> {
    // 1. Authenticate existing user
    const response = await firstValueFrom(this.#authenticationService.login(email, password));

    // 2. Throw an errof if email does not exist
    if(response instanceof UserEmailNotFoundError) {
      throw response;
    }

    // 3. Throw an errof if password is invalid
    if(response instanceof InvalidPasswordError) {
      throw response;
    }

    // 4. Add credentials information in webapp storage
    const { jwtToken, jwtRefreshToken, expiresIn, userId } = response;

    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('jwtRefreshToken', jwtRefreshToken);
    localStorage.setItem('expiresIn', expiresIn);


    // 5. Add user in app store
    const user = await firstValueFrom(this.#userService.fetch(userId));
    this.#userStore.load(user);

    // 6. Redirect user to dashboard
    this.#router.navigate(['/app/dashboard']);
  }
}
