import { TestBed } from '@angular/core/testing';

import { LoginUserUseCaseService } from './login-user.use-case.service';

describe('LoginUserUseCaseService', () => {
  let service: LoginUserUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginUserUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
