import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageComponent } from './signup.page.component';
import { UserStore } from '../../core/store/user.store';
import { AuthenticationService } from '../../core/port/authentication.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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
        { provide: UserStore, useValue: {}},
        { provide: AuthenticationService, useValue: {} }
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
    it.todo('should display error message when field is empty');
    it.todo('should display error message when field do not contain a valid HTML5 email');
  });

  describe('when user interact with password field', () => {
    it.todo('should display error message when field is empty');
    it.todo('should display error message when field contain less than 8 characters');
    it.todo('should display error message when field do not contain at least 1 uppercase character');
    it.todo('should display error message when field do not contain at least 1 lowercase character');
    it.todo('should display error message when field do not contain at least 1 digit');
    it.todo('should display error message when field do not contain at least 1 of the following special characters : @$!%*?&');
  });

  describe('when user interact with "confirm password" field', () => {
    it.todo('should display error message when field is empty');
    it.todo('should display error message when field do not have same value as password field');
  });

  describe('when user submit the form', () => {
    it.todo('should register the user');
  });
});
