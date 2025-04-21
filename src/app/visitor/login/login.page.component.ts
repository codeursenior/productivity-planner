import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvalidCredentialError } from './domain/invalid-credential.error';
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
  readonly invalidCredentialError = signal<InvalidCredentialError|null>(null);

  onSubmit() {
    this.#loginUserUseCase.execute(this.email(), this.password()).catch(error => {
      if(error instanceof InvalidCredentialError) {
        this.invalidCredentialError.set(error);
      }
    })
  }
}
