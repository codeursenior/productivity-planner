import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarSmartComponent } from './navbar.smart.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;

  let title: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent],
      providers: [provideRouter([]),]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    title = fixture.debugElement.query(By.css('[data-testid="navbar-title"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display webapp title', () => {
    expect(title.nativeElement.textContent).toContain('Productivity Planner');
  });
});
