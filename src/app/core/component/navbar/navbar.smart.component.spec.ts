import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NavbarSmartComponent } from './navbar.smart.component';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;

  let title: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([]),]
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
