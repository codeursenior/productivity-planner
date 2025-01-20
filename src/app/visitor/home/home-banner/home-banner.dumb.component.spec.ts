import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBannerDumbComponent } from './home-banner.dumb.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeBannerDumbComponent', () => {
  let component: HomeBannerDumbComponent;
  let fixture: ComponentFixture<HomeBannerDumbComponent>;

  let title: DebugElement;
  let description: DebugElement;
  let button: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBannerDumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeBannerDumbComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'expectedTitle');
    fixture.componentRef.setInput('description', 'expectedDescription');
    fixture.componentRef.setInput('button', 'expectedButton');
    fixture.detectChanges();
  });

  beforeEach(() => {
    title = fixture.debugElement.query(By.css('[data-testid="banner-title"]'));
    description = fixture.debugElement.query(
      By.css('[data-testid="banner-description"]')
    );
    button = fixture.debugElement.query(
      By.css('[data-testid="banner-button"]')
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(title.nativeElement.textContent).toContain('expectedTitle');
  });
  it('should display description', () => {
    expect(description.nativeElement.textContent).toContain(
      'expectedDescription'
    );
  });
  it('should display button', () => {
    expect(button.nativeElement.textContent).toContain('expectedButton');
  });
  it('should trigger event on button click', () => {
    jest.spyOn(component.clicked, 'emit');

    button.nativeElement.click();

    expect(component.clicked.emit).toHaveBeenNthCalledWith(1);
  });
});
