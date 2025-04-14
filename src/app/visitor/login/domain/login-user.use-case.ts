import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserStore } from '@app/core/store/user.store';
import { UserService } from '@app/core/port/user.service';
import { Router } from '@angular/router';
import { InvalidCredentialError } from './invalid-credential.error';

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

    // 2. Throw an error if credentials are invalid
    if(response instanceof InvalidCredentialError) {
      throw response;
    }

    // 3. Add credentials information in webapp storage
    const { userId, jwtToken, jwtRefreshToken, expiresIn } = response;

    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('jwtRefreshToken', jwtRefreshToken);
    localStorage.setItem('expiresIn', expiresIn);


    // 4. Add user in app store
    const user = await firstValueFrom(this.#userService.fetch(userId, jwtToken));
    this.#userStore.load(user);

    // 5. Redirect user to dashboard
    this.#router.navigate(['/app/dashboard']);
  }
}
