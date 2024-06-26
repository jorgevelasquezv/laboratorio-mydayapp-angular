import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-container',
  templateUrl: './tasks-container.component.html',
})
export class TasksContainerComponent {
  constructor(private tasksService: TasksService) {}

  get tasks() {
    return this.tasksService.getTasks();
  }

  addTask(title: string) {
    this.tasksService.addTask(title);
  }

  removeTask(task: Task) {
    this.tasksService.removeTask(task);
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task);
  }

  activateEditMode(task: Task) {
    task.editing = !task.editing;
  }
}
