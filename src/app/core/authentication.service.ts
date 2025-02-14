import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterResponse {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}

export interface LoginResponse {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
  isRegistered: boolean;
}

@Injectable()
export abstract class AuthenticationService {
  abstract register(
    email: string,
    password: string
  ): Observable<RegisterResponse>;

  abstract login(email: string, password: string): Observable<LoginResponse>;
}
