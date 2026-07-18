import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="min-height: 100vh; background-color: #f8fafc; color: #0f172a; padding: 3rem 2rem; font-family: sans-serif;">

      <div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; align-items: center;">

        <div style="width: 220px; height: 220px; background-color: #ffffff; border: 2px dashed #3b82f6; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <span style="color: #3b82f6; font-size: 0.85rem; font-weight: bold; margin-bottom: 16px; letter-spacing: 0.5px;">Stwórz zadanie</span>
          <input
            [(ngModel)]="newTaskTitle"
            (keyup.enter)="quickAdd()"
            type="text"
            placeholder="Co robimy?"
            style="width: 100%; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; color: #0f172a; background: #f1f5f9; box-sizing: border-box; text-align: center; font-size: 0.95rem; outline: none;"
          />
          <button
            (click)="quickAdd()"
            style="margin-top: 16px; width: 100%; background-color: #3b82f6; color: white; border: none; border-radius: 10px; padding: 10px; font-weight: bold; cursor: pointer; font-size: 0.95rem; transition: background 0.2s;">
            Dodaj
          </button>
        </div>

        @for (task of tasks(); track task.id) {
          <div style="width: 220px; height: 220px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: transform 0.2s; position: relative;">

            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
                <span style="font-size: 0.75rem; color: #94a3b8; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">
                  Zadanie #{{ $count - $index }}
                </span>
              </div>

              <div style="font-size: 1.1rem; font-weight: 500; word-break: break-word; color: #334155; line-height: 1.4;">
                {{ task.title }}
              </div>
            </div>

          </div>
        }

      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  newTaskTitle = '';

  ngOnInit() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks.set(data.reverse());
    });
  }

  quickAdd() {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.createTask(this.newTaskTitle.trim()).subscribe(savedTask => {
      this.tasks.update(current => [savedTask, ...current]);
      this.newTaskTitle = '';
    });
  }
}
