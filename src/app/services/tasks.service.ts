import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe({
        next: (event) => {
          const tasks: Task[] = JSON.parse(
            localStorage.getItem('mydayapp-angular') ?? '[]'
          );
          switch (event.url) {
            case '/':
              this.tasks = tasks;
              break;
            case '/completed':
              this.tasks = tasks.filter((task) => task.completed);
              break;
            case '/pending':
              this.tasks = tasks.filter((task) => !task.completed);
              break;
          }
        },
      });

    this.loadTaskToLocalStorage();
  }

  get allTasks(): Task[] {
    const tasks = localStorage.getItem('mydayapp-angular');
    return JSON.parse(tasks ?? '[]');
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(title: string): void {
    const task: Task = {
      id: Date.now() + Math.floor(Math.random() * (999 - 0 + 1)) + 0,
      title,
      completed: false,
      editing: false,
    };
    this.tasks.push(task);
    this.saveTaskToLocalStorage();
  }

  removeTask(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.saveTaskToLocalStorage();
  }

  updateTask(task: Task): void {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
    this.saveTaskToLocalStorage();
  }

  editingMode(task: Task): void {
    this.tasks = this.tasks.map((t) =>
      t.id === task.id ? task : { ...t, editing: false }
    );
  }

  getPendingTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter((task) => task.completed);
  }

  clearCompletedTasks(): void {
    this.loadTaskToLocalStorage();
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTaskToLocalStorage();
  }

  saveTaskToLocalStorage(): void {
    localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
  }

  private loadTaskToLocalStorage(): void {
    const tasks = localStorage.getItem('mydayapp-angular');
    if (!tasks) {
      localStorage.setItem('mydayapp-angular', JSON.stringify(this.tasks));
    }
    this.tasks = JSON.parse(tasks ?? '[]');
  }
}
