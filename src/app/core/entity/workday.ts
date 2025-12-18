import {
  getActivePomodoroIndex,
  getActiveTask,
  getActiveTaskIndex,
  getTaskEmojiStatus,
  isTaskCompleted,
  Task,
  TaskList,
} from '@app/membership/workday/task.model';
import { Entity } from '../domain/entity.class';

interface WorkdayProps {
  taskList: TaskList;
  mode: 'edit' | 'execution';
}

export class Workday extends Entity<WorkdayProps> {
  static readonly MAX_POMODORO_DURATION_IN_SEC = 5; // TODO: 25 minutes.
  static readonly MAX_TASKS_PER_DAY = 6;
  /** @remarks Specific override because Workday ID is a date, generated on frontend side. */
  override readonly _id;

  private constructor(props: WorkdayProps, date: string) {
    super(props, date);
    this._id = date;
  }

  static createEmpty(): Workday {
    const date = Date.now();
    const taskList: TaskList = [
      {
        type: 'Hit the target',
        title: 'Nouvelle tâche',
        status: 'Not started',
        pomodoroCount: 1,
        pomodoroList: [0],
        statusEmoji: '🏁',
      },
    ];
    const mode = 'edit';
    const emptyProps: WorkdayProps = { taskList, mode };

    return new Workday(emptyProps, date.toString());
  }

  createEmptyAtDate(date: string): Workday {
    const workday = Workday.createEmpty();
    return new Workday(workday.props, date);
  }

  /* Readonly  */

  get date(): string {
    return this._id;
  }

  get taskList(): TaskList {
    return this.props.taskList;
  }

  get taskCount(): number {
    return this.props.taskList.length;
  }

  get hasTaskPlanned(): boolean {
    return this.taskCount > 0;
  }

  get hasNoTaskPlanned(): boolean {
    return this.taskCount === 0;
  }

  get isEditMode(): boolean {
    return this.props.mode === 'edit';
  }

  get isExecutionMode(): boolean {
    return this.props.mode === 'execution';
  }

  get isWorkdayCompleted(): boolean {
    return this.taskList.every((task) => {
      return isTaskCompleted(task);
    });
  }

  get canAddTask(): boolean {
    return this.taskCount < Workday.MAX_TASKS_PER_DAY;
  }

  /* Actions */

  setExecutionMode(): Workday {
    if (this.isExecutionMode) {
      throw new Error('Workday is already in execution mode.');
    }

    this.props.mode = 'execution';
    return this;
  }

  setEditMode(): Workday {
    if (this.isEditMode) {
      throw new Error('Workday is already in edit mode.');
    }

    this.props.mode = 'edit';
    return this;
  }

  addEmptyTask(): Workday {
    if (this.taskCount >= Workday.MAX_TASKS_PER_DAY) {
      throw new Error('Maximum number of tasks reached for the day.');
    }

    this.props.taskList.push(Workday.getEmptyTask());
    return this;
  }

  updateTask(index: number, updatedTask: Task): Workday {
    if (index < 0 || index >= this.props.taskList.length) {
      throw new Error(`Cannot update task at index ${index}.`);
    }

    this.props.taskList[index] = updatedTask;
    return this;
  }

  removeTask(index: number): Workday {
    if (index < 0 || index >= this.props.taskList.length) {
      throw new Error(`Cannot remove task at index ${index}.`);
    }

    this.props.taskList.splice(index, 1);
    return this;
  }

  tick(): Workday {
    const task = getActiveTask(this.taskList);
    const taskIndex = getActiveTaskIndex(this.taskList);

    if (!task) {
      throw new Error('No active task found');
    }

    const pomodoroIndex = getActivePomodoroIndex(task);

    if (pomodoroIndex === -1) {
      throw new Error('No active pomodoro found');
    }

    this.taskList[taskIndex].pomodoroList[pomodoroIndex]++;
    this.taskList[taskIndex].statusEmoji = getTaskEmojiStatus(
      this.taskList[taskIndex]
    );

    return this;
  }

  // TODO: Extract following methods of Task into a Value Object.
  isTaskCompleted(task: Task): boolean {
    if (this.isGetThingsDone(task)) {
      return task.status === 'Done';
    }

    // Hit the target task
    return task.pomodoroList.every((pomodoro) =>
      this.isPomodoroCompleted(pomodoro)
    );
  }

  isGetThingsDone(task: Task): boolean {
    return task.type === 'Get things done';
  }

  isPomodoroCompleted(pomodoro: number): boolean {
    return pomodoro === Workday.MAX_POMODORO_DURATION_IN_SEC;
  }

  static getEmptyTask(): Task {
    return {
      type: 'Hit the target',
      title: 'Nouvelle tâche',
      status: 'Not started',
      pomodoroCount: 1,
      pomodoroList: [0],
      statusEmoji: '🏁',
    };
  }
}
