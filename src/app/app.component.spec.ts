import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterOutlet } from '@angular/router';
import { NavbarSmartComponent } from './core/component/navbar/navbar.smart.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, NavbarSmartComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
