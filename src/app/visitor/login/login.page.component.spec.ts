import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login.page.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginUserUseCase } from './domain/login-user.use-case';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginUserUseCase: LoginUserUseCase;
  let email: DebugElement;
  let password: DebugElement;
  let submitButton: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        { provide: LoginUserUseCase, useValue: { execute: jest.fn( ) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loginUserUseCase = TestBed.inject(LoginUserUseCase);
    email = fixture.debugElement.query(By.css('[data-testid="email"]'));
    password = fixture.debugElement.query(By.css('[data-testid="password"]'));
    submitButton = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when page load', () => {
    it('should display email field', () => {
      // Assert
      expect(email).toBeTruthy();
    });
    it('should display password field', () => {
      // Assert
      expect(password).toBeTruthy();
    });
  });

  describe('when user interact with email field', () => {
    it('should display error message when field is empty', () => {
      // Act 
      email.nativeElement.value = '';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-email-required"]'));
      const errorMessage = error.nativeElement.textContent;
      
      // Assert
      expect(errorMessage).toContain('Email is required.');
    });
    

    it('should display error message when field do not contain a valid HTML5 email', () => {
      // Act
      email.nativeElement.value = 'invalid-email';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-email-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      // Assert
      expect(errorMessage).toContain('Email must be valid.');
    });

  });

  describe('when user interact with password field', () => {
    it('should display error message when field is empty', () => {
      // Act
      password.nativeElement.value = '';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));
      const errorMessage = error.nativeElement.textContent;

      // Assert
      expect(errorMessage).toContain('Password is required.');
    });

    it('should hide error message when field is valid', () => {
      // Act
      password.nativeElement.value = 'password-1234';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));

      // Assert
      expect(error).toBeNull();
    });
  });

  describe('when user submit a valid login form', () => {
    it('should call login use case with email and password', () => {
      // Arrange
      email.nativeElement.value = 'john.doe@acme.com';
      email.nativeElement.dispatchEvent(new Event('input'));
      password.nativeElement.value = 'password-1234';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Act
      submitButton.nativeElement.click();
      fixture.detectChanges();
    
      // Assert
      expect(loginUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(loginUserUseCase.execute).toHaveBeenCalledWith(
        email.nativeElement.value,
        password.nativeElement.value
      );
    });
  });

  describe('when user submit an invalid login form', () => {
    it('should not call login use case', () => {
      // Arrange
      email.nativeElement.value = 'invlid-email';
      email.nativeElement.dispatchEvent(new Event('input'));
      password.nativeElement.value = 'invalid-password';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Act
      submitButton.nativeElement.click();
      fixture.detectChanges();
    
      // Assert
      expect(loginUserUseCase.execute).not.toHaveBeenCalled();
    });
  });
});
