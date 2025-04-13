import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvalidPasswordError } from './domain/invalid-password.error';
import { UserEmailNotFoundError } from './domain/user-email-not-found.error';
import { LoginUserUseCase } from './domain/login-user.use-case';

@Component({
  imports: [FormsModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.scss'
})
export class LoginPageComponent {
  readonly #loginUserUseCase = inject(LoginUserUseCase);

  readonly email = signal('');
  readonly password = signal('');

  readonly userEmailNotFoundError = signal<UserEmailNotFoundError|null>(null);
  readonly isUserEmailNotFound = computed(() => this.userEmailNotFoundError()?.email === this.email());
  readonly invalidPasswordError = signal<InvalidPasswordError|null>(null);
  readonly isInvalidPassword = computed(() => this.invalidPasswordError()?.password === this.password());

  onSubmit() {
    this.#loginUserUseCase.exectute(this.email(), this.password()).catch(error => {
      if(error instanceof UserEmailNotFoundError) {
        this.userEmailNotFoundError.set(error);
      }

      if(error instanceof InvalidPasswordError) {
        this.invalidPasswordError.set(error);
      } 
    })
  }
}
