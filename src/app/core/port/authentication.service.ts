import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';
import { EmailAlreadyTakenError } from '@app/visitor/signup/domain/email-already-taken.error';
import { UserEmailNotFoundError } from '@app/visitor/login/domain/user-email-not-found.error';
import { InvalidPasswordError } from '@app/visitor/login/domain/invalid-password.error';

export type RegisterResponse = RegisterPayload | EmailAlreadyTakenError;
export type LoginResponse = LoginPayload | UserEmailNotFoundError | InvalidPasswordError;

interface RegisterPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}

interface LoginPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
  isRegistered: boolean;
}

@Injectable({
  providedIn: 'root',
  useClass: AuthenticationFirebaseService,
})
export abstract class AuthenticationService {
  abstract register(
    email: string,
    password: string
  ): Observable<RegisterResponse>;

  abstract login(email: string, password: string): Observable<LoginResponse>;
}
