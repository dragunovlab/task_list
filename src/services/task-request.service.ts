import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITask } from "../interfaces/task.interface";

@Injectable()
export class TaskRequestService {

    protected readonly url: string = 'http://localhost:3000/api';
    protected readonly httpClient: HttpClient = inject(HttpClient);

    public getTaskList(): Observable<ITask[]> {
        return this.httpClient.get<ITask[]>(`${this.url}/task`);
    }

    public addTask(task: ITask): Observable<void> {
        return this.httpClient.post<void>(`${this.url}/task`, task);
    }
    
    public deleteTask(id: string): Observable<string> {
        return this.httpClient.delete<string>(`${this.url}/task/${id}`);
    }
}