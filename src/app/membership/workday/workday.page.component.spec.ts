import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { WorkdayPageComponent } from './workday.page.component';

describe('WorkdayPageComponent', () => {
  let component: WorkdayPageComponent;
  let fixture: ComponentFixture<WorkdayPageComponent>;

  const getAddTaskButton = () =>
    fixture.nativeElement.querySelector('[data-testid=add-task-button]');

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

  describe('when workday page load', () => {
    it('sould display one task', () => {
      expect(component.store.taskCount()).toBe(1);
    });
    it('sould display "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeDefined();
    });
  });

  describe('when user remove a task', () => {
    it('should remove corresponding task', () => {
      // Arrange
      - Ajouter 3 tâches 
      - Modifier les titres des 3 tâches : tache 1, tache 2, tache 3

      // Act 
      - Click sur remove de la tâche n°2
      - Rerécupérer la task à $index2 

      // Assert 
      - Vérifier que son nom doit être tache 3
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
    it('sould hide "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeNull();
    });
  });
});
