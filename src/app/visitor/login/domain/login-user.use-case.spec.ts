import { TestBed } from '@angular/core/testing';
import { LoginUserUseCase } from './login-user.use-case';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';

describe('LoginUserUseCaseService', () => {
  let service: LoginUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginUserUseCase,
        { provide: AuthenticationService, useValue: { register: jest.fn()}},
        { provide: UserService, useValue: { create: jest.fn( )}},
        { provide: UserStore, useValue: { register: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }},
      ],
    });
    service = TestBed.inject(LoginUserUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
