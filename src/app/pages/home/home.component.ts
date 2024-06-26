import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private tasksService: TasksService) {}

  get tasks() {
    return this.tasksService.allTasks;
  }

  public addTask(event: Event): void {
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();
    if (!title) {
      return;
    }
    this.tasksService.addTask(title);
    input.value = '';
  }
}
