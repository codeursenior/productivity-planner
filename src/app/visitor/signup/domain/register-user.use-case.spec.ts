import { TestBed } from '@angular/core/testing';

import { RegisterUserUseCase } from './register-user.use-case';
import { AuthenticationService } from '@app/core/port/authentication.service';
import { UserService } from '@app/core/port/user.service';
import { UserStore } from '@app/core/store/user.store';
import { Router } from '@angular/router';

describe('RegisterUserUseCaseService', () => {
  let service: RegisterUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RegisterUserUseCase,
        { provide: AuthenticationService, useValue: { register: jest.fn()}},
        { provide: UserService, useValue: { create: jest.fn( )}},
        { provide: UserStore, useValue: { register: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }},
      ],
    });
    service = TestBed.inject(RegisterUserUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
