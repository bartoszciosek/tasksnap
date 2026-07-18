import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  createdAt?: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title, completed: false });
  }

  toggleTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/toggle`, {});
  }
}
