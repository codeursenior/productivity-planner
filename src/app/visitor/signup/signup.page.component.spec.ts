import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SignupPageComponent } from './signup.page.component';
import { RegisterUserUseCase } from './domain/register-user.use-case';

describe('SignupPageComponent', () => {
  let component: SignupPageComponent;
  let fixture: ComponentFixture<SignupPageComponent>;

  let name: DebugElement;
  let email: DebugElement;
  let password: DebugElement;
  let confirmPassword: DebugElement;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupPageComponent],
      providers: [
        { provide: RegisterUserUseCase, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    name = fixture.debugElement.query(By.css('[data-testid="name"]'));
    email = fixture.debugElement.query(By.css('[data-testid="email"]'));
    password = fixture.debugElement.query(By.css('[data-testid="password"]'));
    confirmPassword = fixture.debugElement.query(By.css('[data-testid="confirm-password"]'));
    button = fixture.debugElement.query(By.css('[data-testid="submit-button"]'));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when page load', () => {
    it('should diplay fields name, email, password and confirm password', () => {
      expect(name).toBeTruthy();
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();
      expect(confirmPassword).toBeTruthy();
    });

    it('should diplay a submit button', () => {
      expect(button).toBeTruthy();
    });
  })

  describe('when user interact with name field', () => {
    it('should display error message when field is empty', () => {
      name.nativeElement.value = '';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-name-required"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toBe('Name is required.');
    });

    it('should display error message when field contain less than 3 characters', () => {
      name.nativeElement.value = 'a';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-minlength"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Name must contain at least 3 caracters.');
    });

    it('should display error message when field contain more than 20 characters', () => {
      name.nativeElement.value = 'abcdefghijklmnopqrstuvwxyz';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-maxlength"]'));
      const errorMessage = error.nativeElement.textContent;
      
      expect(errorMessage).toContain('Name must contain maximum 20 caracters.');
    });

    it('should display error message when field do not contain only letters', () => {
      name.nativeElement.value = '!';
      name.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
  
      const error = fixture.debugElement.query(By.css('[data-testid="error-name-pattern"]'));
      const errorMessage = error.nativeElement.textContent;
      
      expect(errorMessage).toContain('Name must contain only letters.');
    });
  });

  describe('when user interact with email field', () => {
    it('should display error message when field is empty', () => {
      email.nativeElement.value = '';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-email-required"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Email is required.');
    });

    it('should display error message when field do not contain a valid HTML5 email', () => {
      email.nativeElement.value = 'invalid-email';
      email.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-email-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Email must be valid.');
    });
  });

  describe('when user interact with password field', () => {
    it('should display error message when field is empty', () => {
      password.nativeElement.value = '';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-required"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password is required.');
    });

    it('should display error message when field contain less than 8 characters', () => {
      password.nativeElement.value = 'Ab1$e';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-minlength"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least 8 characters.');
    });

    it('should display error message when field do not contain at least 1 uppercase character', () => {
      password.nativeElement.value = 'abc1$def';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character (@$!%*?&).');
    });

    it('should display error message when field do not contain at least 1 lowercase character', () => {
      password.nativeElement.value = 'ABC1$DEF';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character (@$!%*?&).');
    });

    it('should display error message when field do not contain at least 1 digit', () => {
      password.nativeElement.value = 'Abc$defg';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character (@$!%*?&).');
    });

    it('should display error message when field do not contain at least 1 of the following special characters : @$!%*?&', () => {
      password.nativeElement.value = 'Abc1defg';
      password.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-password-pattern"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character (@$!%*?&).');
    });
  });

  describe('when user interact with "confirm password" field', () => {
    it('should display error message when field do not have same value as password field', () => {
      password.nativeElement.value = 'Abc1$def';
      password.nativeElement.dispatchEvent(new Event('input'));
      confirmPassword.nativeElement.value = 'Different1$';
      confirmPassword.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const error = fixture.debugElement.query(By.css('[data-testid="error-confirm-password-match"]'));
      const errorMessage = error.nativeElement.textContent;

      expect(errorMessage).toContain('Passwords do not match.');
    });
  });


});
