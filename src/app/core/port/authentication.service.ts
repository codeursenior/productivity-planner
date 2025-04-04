import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';

export interface RegisterResponse {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}

export class EmailAlreadyTakenError extends Error {
  constructor(readonly email: string) {
    super(`Email ${email} is already taken. Please try another email.`);
    this.name = 'EmailAlreadyTakenError';
  }
}

export interface LoginResponse {
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
  ): Observable<RegisterResponse | EmailAlreadyTakenError>;

  abstract login(email: string, password: string): Observable<LoginResponse>;
}
