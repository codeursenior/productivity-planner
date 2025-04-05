import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Visitor } from '@app/core/entity/user.interface';
import { RegisterUserUseCase } from './domain/register-user.use-case';
import { EmailAlreadyTakenError } from './domain/email-already-taken.error';

@Component({
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
})
export class SignupPageComponent {
  readonly #registerUserUseCase = inject(RegisterUserUseCase);

  readonly isLoading = signal(false);
  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');
  readonly isPasswordMatch = computed(
    () => this.password() === this.confirmPassword()
  );

  readonly emailAlreadyTakenError = signal<EmailAlreadyTakenError|null>(null);
  readonly isEmailAlreadyTaken = computed(() => this.emailAlreadyTakenError()?.email === this.email());

  onSubmit() {
    this.isLoading.set(true);

    const visitor: Visitor = {
      name: this.name(), 
      email: this.email(), 
      password: this.password()
    }

    this.#registerUserUseCase.execute(visitor)
    .catch(error => {
      this.isLoading.set(false);
      const isEmailAlreadyTaken = error instanceof EmailAlreadyTakenError;
      
      if(isEmailAlreadyTaken) {
        this.emailAlreadyTakenError.set(error);
      }
    });
  }
}
