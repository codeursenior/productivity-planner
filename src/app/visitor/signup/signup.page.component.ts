import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../core/store/user.store';
import { Visitor } from '../../core/entity/user.interface';
import { RegisterUserUseCaseService } from './register-user.use-case.service';
import { Router } from '@angular/router';
import { EmailAlreadyTakenError } from 'src/app/core/port/authentication.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
})
export class SignupPageComponent {
  readonly store = inject(UserStore);
  readonly #registerUserUseCase = inject(RegisterUserUseCaseService);
  readonly #router = inject(Router);

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatch = computed(
    () => this.password() === this.confirmPassword()
  );

  readonly emailAlreadyTakenErrorMessage = signal('');

  onSubmit() {
    const visitor: Visitor = {
      name: this.name(), 
      email: this.email(), 
      password: this.password()
    }

    this.#registerUserUseCase.execute(visitor)
    .then(() => this.#router.navigate(['/app/dashboard']))
    .catch(error => {
      if(error instanceof EmailAlreadyTakenError) {
        this.emailAlreadyTakenErrorMessage.set(error.message);
      }
    });
  }
}
