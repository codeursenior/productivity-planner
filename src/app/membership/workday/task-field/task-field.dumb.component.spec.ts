import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFieldDumbComponent } from './task-field.dumb.component';

describe('TaskFieldDumbComponent', () => {
  let component: TaskFieldDumbComponent;
  let fixture: ComponentFixture<TaskFieldDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFieldDumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFieldDumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('index', 0);
    fixture.componentRef.setInput('task', {
      type: 'Hit the target',
      title: 'Nouvelle tâche',
      pomodoroCount: 1,
      pomodoroList: [],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
