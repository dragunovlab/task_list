import { inject, Injectable } from "@angular/core";
import { ITask } from "../interfaces/task.interface";
import { TaskStoreService } from './task-store.service';

@Injectable()
export class TaskManagerService {

    public get taskList(): ITask[] {
        return JSON.parse(localStorage.getItem('items')!) ?? [];
    }

    private _taskList: ITask[]= JSON.parse(localStorage.getItem('items')!) ?? [];

    private _taskStoreService: TaskStoreService = inject(TaskStoreService);

    public addTask(task: ITask): void {
        this._taskList.push(task);
        this._taskList = [...this._taskList];
        this._taskStoreService.addStorage(this._taskList);
    }

    public deleteTask(id: string): void {
        this._taskList = this._taskList.filter(item => item.id !== id);
        this._taskStoreService.addStorage(this._taskList);
    }

    public editTask(task: ITask): void {
        this._taskList = this._taskList.map(item => {
            if (item.id === task.id) {
                return task
            }

            return item;
        });
        this._taskStoreService.addStorage(this._taskList);
    }
}
