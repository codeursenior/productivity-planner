import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WorkdayPageComponent } from './workday.page.component';

describe('WorkdayPageComponent', () => {
  let component: WorkdayPageComponent;
  let fixture: ComponentFixture<WorkdayPageComponent>;

  const getAddTaskButton = () =>
    fixture.debugElement.query(By.css('[data-testid="add-task-button"]'));
  const getStartWorkdayButton = () =>
    fixture.debugElement.query(By.css('[data-testid="start-workday-button"]'));
  /* Get task by position instead of index: getTask(1) <=> task at index 0. */
  const getTask = (id: number) =>
    fixture.debugElement.query(By.css(`[data-testid="task-${id - 1}"]`));
  const getTaskInput = (id: number) =>
    fixture.debugElement.query(By.css(`[data-testid="task-input-${id - 1}"]`));
  const getRemoveTaskButton = (id: number) =>
    fixture.debugElement.query(By.css(`[data-testid="task-remove-${id - 1}"]`));
  const getInboxZeroPlaceholder = () =>
    fixture.debugElement.query(
      By.css('[data-testid="inbox-zero-placeholder"]')
    );

  const setTaskTitle = (id: number, title: string) => {
    const input = getTaskInput(id).nativeElement as HTMLInputElement;
    input.value = title;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  };

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

  describe('when empty workday page load', () => {
    it('sould display one task', () => {
      expect(getTask(1)).toBeTruthy();
      expect(getTask(2)).toBeNull();
    });
    it('sould display "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeTruthy();
    });
    it('should hide inbox zero placeholder', () => {
      expect(getInboxZeroPlaceholder()).toBeNull();
    });
    it('sould display "Start workday" button', () => {
      const button = getStartWorkdayButton();
      expect(button).toBeTruthy();
    });
  });

  describe('when user remove a task', () => {
    it('should remove corresponding task', () => {
      // Arrange
      const button = getAddTaskButton();
      button.nativeElement.click();
      button.nativeElement.click();
      button.nativeElement.click();
      fixture.detectChanges();
      setTaskTitle(1, 'Tâche 1');
      setTaskTitle(2, 'Tâche 2');
      setTaskTitle(3, 'Tâche 3');

      // Act
      getRemoveTaskButton(2).nativeElement.click();
      fixture.detectChanges();

      // Assert
      const secondTaskInput = getTaskInput(2).nativeElement;
      expect(secondTaskInput.value).toBe('Tâche 3');
    });
  });

  describe('when there is 6 tasks planned for the current day', () => {
    beforeEach(() => {
      const button = getAddTaskButton();
      button.nativeElement.click();
      button.nativeElement.click();
      button.nativeElement.click();
      button.nativeElement.click();
      button.nativeElement.click();
      fixture.detectChanges();
    });
    it('sould hide "Add task" button', () => {
      const button = getAddTaskButton();
      expect(button).toBeNull();
    });
  });

  describe('when no task is planned', () => {
    beforeEach(() => {
      getRemoveTaskButton(1).nativeElement.click();
      fixture.detectChanges();
    });

    it('should display inbox zero placeholder', () => {
      expect(getInboxZeroPlaceholder()).toBeTruthy();
    });
    it('sould hide "Start workday" button', () => {
      const button = getStartWorkdayButton();
      expect(button).toBeNull();
    });
  });
});
