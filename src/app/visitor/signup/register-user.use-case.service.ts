import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, Visitor } from 'src/app/core/entity/user.interface';
import { AuthenticationService } from 'src/app/core/port/authentication.service';
import { UserService } from 'src/app/core/port/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserUseCaseService {

  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);

  async execute(visitor: Visitor): Promise<User|Error> {
    // 1. Authenticate new visitor
    const name = visitor.name;
    const email = visitor.email;
    const password = visitor.password;
    const authResponse = await firstValueFrom(this.#authenticationService.register(email, password));

    // 2. Add credentials information in session storage
    const jwtToken = authResponse.jwtToken;
    const id = authResponse.userId;

    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('email', email);

    // 3. Create new user in database
    const user: User = { id, name, email };
    await firstValueFrom(this.#userService.create(user, jwtToken));

    return user;
  }
}
