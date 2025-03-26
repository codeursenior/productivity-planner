import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../core/store/user.store';
import { AuthenticationService } from '../../core/port/authentication.service';
import { User, Visitor } from '../../core/entity/user.interface';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
})
export class SignupPageComponent {
  readonly store = inject(UserStore);
  readonly authenticationService = inject(AuthenticationService);

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatch = computed(
    () => this.password() === this.confirmPassword()
  );

  onSubmit() {
    const visitor: Visitor = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };
    this.store.register(visitor);
  }
}
