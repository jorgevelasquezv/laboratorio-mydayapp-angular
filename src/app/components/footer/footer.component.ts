import { TasksService } from 'src/app/services/tasks.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private tasksService: TasksService) {}

  get pendingTask(): number {
    return this.tasksService.getPendingTasks().length;
  }

  get completedTask(): number {
    return this.tasksService.getCompletedTasks().length;
  }

  public clearCompletedTasks(): void {
    this.tasksService.clearCompletedTasks();
  }
}
