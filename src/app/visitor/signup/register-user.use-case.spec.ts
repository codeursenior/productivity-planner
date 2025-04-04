import { TestBed } from '@angular/core/testing';

import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCaseService', () => {
  let service: RegisterUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterUserUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
