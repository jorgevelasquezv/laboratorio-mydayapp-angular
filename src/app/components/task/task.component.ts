import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private taskService: TasksService) {}

  public handlerCompleted(): void {
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task);
  }

  public handlerEditingMode(): void {
    this.task.editing = !this.task.editing;
    this.taskService.editingMode(this.task);
  }

  public handlerRemoveTask(): void {
    this.taskService.removeTask(this.task);
  }

  public handlerUpdateTask(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.task.title = input.value.trim();
    if (!this.task.title) return;
    this.taskService.updateTask(this.task);
    this.task.editing = false;
  }

  public handlerCancelEditing(): void {
    this.task.editing = false;
  }
}
