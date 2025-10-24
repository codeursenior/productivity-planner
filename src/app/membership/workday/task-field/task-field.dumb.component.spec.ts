import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFieldDumbComponent } from './task-field.dumb.component';

describe('TaskFieldDumbComponent', () => {
  let component: TaskFieldDumbComponent;
  let fixture: ComponentFixture<TaskFieldDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFieldDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFieldDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
