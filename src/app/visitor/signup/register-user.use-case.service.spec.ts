import { TestBed } from '@angular/core/testing';

import { RegisterUserUseCaseService } from './register-user.use-case.service';

describe('RegisterUserUseCaseService', () => {
  let service: RegisterUserUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterUserUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
