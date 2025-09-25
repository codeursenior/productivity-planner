import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { WorkdayPageComponent } from './workday.page.component';

describe('WorkdayPageComponent', () => {
  let component: WorkdayPageComponent;
  let fixture: ComponentFixture<WorkdayPageComponent>;

  const getAddTaskButton = () =>
    fixture.nativeElement.querySelector('[data-test=add-task-button]');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkdayPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkdayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there is less than 6 tasks planned for the current day', () => {
    it('sould display "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeDefined();
    });
  });

  describe('when there is 6 tasks planned for the current day', () => {
    beforeEach(() => {
      component.store.onAddTask();
      component.store.onAddTask();
      component.store.onAddTask();
      component.store.onAddTask();
      component.store.onAddTask();
      fixture.detectChanges();
    });
    it('sould display "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeNull();
    });
  });
});
